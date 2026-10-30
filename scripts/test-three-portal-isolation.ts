import { supportRepository } from '../src/services/supportRepository';
import { financeRepository } from '../src/services/financeRepository';
import { operationsRepository } from '../src/services/operationsRepository';
import { projectionsService } from '../src/services/projectionsService';
import { checkRouteAccess, resolveRoutePortal } from '../src/services/portalGuard';
import { auditService } from '../src/services/auditService';
import { maskPhoneNumber, maskPaymentIdentifier } from '../src/types/security';

console.log('====================================================');
console.log('HYPERMART THREE-PORTAL ISOLATION & DATA SEPARATION TESTS');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Data Masking Tests
console.log('--- 1. Security & Privacy Masking Tests ---');
const maskedPhone = maskPhoneNumber('+919876543210');
assert(maskedPhone.includes('******') && maskedPhone.endsWith('3210'), 'Phone number is masked (+91******3210)');

const maskedCard = maskPaymentIdentifier('4532110022004022');
assert(maskedCard.includes('••••') && maskedCard.endsWith('4022'), 'Payment card is masked (•••• 4022)');

// 2. Domain Repository Boundaries
console.log('\n--- 2. Domain Repository Boundaries ---');
const supportCases = supportRepository.getCases();
assert(supportCases.length > 0, 'SupportCaseRepository returns support cases');
assert(!('paymentLedger' in supportRepository), 'SupportCaseRepository does not expose payment ledger');
assert(!('pickerProductivity' in supportRepository), 'SupportCaseRepository does not expose picker productivity');

const financeLedger = financeRepository.getLedger();
assert(financeLedger.length > 0, 'FinanceLedgerRepository returns payment entries');
assert(!('customerConversations' in financeRepository), 'FinanceLedgerRepository does not expose customer conversations');
assert(!('warehouseShifts' in financeRepository), 'FinanceLedgerRepository does not expose warehouse shifts');

const opsOrders = operationsRepository.getOrders();
assert(opsOrders.length > 0, 'OperationsFulfilmentRepository returns operations orders');
assert(opsOrders[0].customerPhoneMasked.includes('******'), 'Operations customer phone is masked by default');
assert(!('fullPaymentLedger' in operationsRepository), 'OperationsFulfilmentRepository does not expose full payment ledger');

// 3. Route Guard & Cross-Portal Access Denial Tests
console.log('\n--- 3. Route Guard & Cross-Portal Access Denial Tests ---');
const supportSession = {
  userId: 'usr_sup_102',
  employeeId: 'EMP-042',
  portal: 'support' as const,
  roles: ['support_agent'],
  hubIds: ['hub_coimbatore'],
  regionIds: ['region_south'],
  permissions: ['portal.support.access', 'support.case.read'],
  sessionId: 'sess_1',
};

const financeSession = {
  userId: 'usr_fin_104',
  employeeId: 'EMP-088',
  portal: 'finance' as const,
  roles: ['finance_analyst'],
  hubIds: ['hub_coimbatore'],
  regionIds: ['region_south'],
  permissions: ['portal.finance.access', 'finance.payment.read'],
  sessionId: 'sess_2',
};

// Support user requesting Finance route
const crossAccess1 = checkRouteAccess('/portal/payment-ledger', supportSession);
assert(!crossAccess1.allowed && crossAccess1.requiredPortal === 'finance', 'Support user blocked from Finance route (/portal/payment-ledger)');

// Finance user requesting Support route
const crossAccess2 = checkRouteAccess('/portal/customer-care', financeSession);
assert(!crossAccess2.allowed && crossAccess2.requiredPortal === 'support', 'Finance user blocked from Support route (/portal/customer-care)');

// Support user requesting Support route
const validAccess = checkRouteAccess('/portal/support', supportSession);
assert(validAccess.allowed, 'Support user allowed access to Support route (/portal/support)');

// 4. Dedicated Cross-Portal Projections Tests
console.log('\n--- 4. Cross-Portal Projections Tests ---');
const supportOrderProj = projectionsService.getSupportOrderStatus('HM-88219', 'EMP-042');
assert(supportOrderProj.orderId === 'HM-88219', 'Support received order status projection');
assert(!('warehouseTasks' in supportOrderProj), 'Universal warehouse tasks excluded from Support projection');
assert(!('paymentGatewayLogs' in supportOrderProj), 'Universal gateway logs excluded from Support projection');
assert(supportOrderProj.customerPhoneMasked.includes('******'), 'Customer phone is masked in Support projection');

const finPaymentProj = projectionsService.getFinancePaymentSummary('HM-88219', 'FIN-104');
assert(finPaymentProj.orderAmount === 2480, 'Finance received minimal payment summary projection');
assert(!('supportConversation' in finPaymentProj), 'Customer conversations excluded from Finance projection');
assert(!('pickerId' in finPaymentProj), 'Warehouse picker details excluded from Finance projection');

const opsFulfilmentProj = projectionsService.getOperationsFulfilment('HM-88219', 'OPS-202');
assert(opsFulfilmentProj.deliverySlot === '2026-10-30 08:00-12:00', 'Operations received fulfilment projection');
assert(!('customerCardNumber' in opsFulfilmentProj), 'Payment card excluded from Operations projection');

// 5. Audit Logging Verification
console.log('\n--- 5. Audit Logging Verification ---');
const auditHistory = auditService.getAuditHistory();
assert(auditHistory.length > 0, 'Audit history is maintained and populated');
const projectionLogs = auditHistory.filter((e) => e.event === 'cross_portal_projection_read');
assert(projectionLogs.length >= 3, 'Cross-portal projection reads are audited with user and source domain');
const rejectionLogs = auditHistory.filter((e) => e.event === 'route_guard_rejection');
assert(rejectionLogs.length >= 2, 'Route guard rejections are audited');

// Summary
console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
