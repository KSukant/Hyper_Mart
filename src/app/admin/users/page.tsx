'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Key,
  FileText,
  Settings,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Plus,
  Edit2,
  UserCheck,
  Smartphone,
  Save,
  Check,
  Sliders,
} from 'lucide-react';
import { AUDIT_EVENTS, AuditEvent } from '@/mocks/adminData';
import { useAdminStore } from '@/store/adminStore';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Catalogue & Merchandising' | 'Warehouse & Logistics' | 'Customer Care & Finance';
  facility: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
  status: 'Active' | 'Suspended';
}

const INITIAL_USERS: SystemUser[] = [
  {
    id: 'u-1',
    name: 'Dev K.',
    email: 'dev.k@hypermart.in',
    role: 'Super Admin',
    facility: 'All Hubs',
    twoFactorEnabled: true,
    lastLogin: 'Today, 12:41 PM',
    status: 'Active',
  },
  {
    id: 'u-2',
    name: 'Priya S.',
    email: 'priya.s@hypermart.in',
    role: 'Catalogue & Merchandising',
    facility: 'Corporate HQ',
    twoFactorEnabled: true,
    lastLogin: 'Today, 11:02 AM',
    status: 'Active',
  },
  {
    id: 'u-3',
    name: 'Arjun M.',
    email: 'arjun.m@hypermart.in',
    role: 'Warehouse & Logistics',
    facility: 'Coimbatore DC',
    twoFactorEnabled: true,
    lastLogin: 'Today, 09:18 AM',
    status: 'Active',
  },
  {
    id: 'u-4',
    name: 'Riya A.',
    email: 'riya.a@hypermart.in',
    role: 'Warehouse & Logistics',
    facility: 'Chennai FC',
    twoFactorEnabled: true,
    lastLogin: 'Yesterday, 18:27 PM',
    status: 'Active',
  },
  {
    id: 'u-5',
    name: 'Jordan Diaz',
    email: 'jordan.d@hypermart.in',
    role: 'Customer Care & Finance',
    facility: 'Support Central',
    twoFactorEnabled: false,
    lastLogin: 'Today, 08:30 AM',
    status: 'Active',
  },
];

interface PermissionRow {
  permission: string;
  category: string;
  superAdmin: boolean;
  catalogue: boolean;
  warehouse: boolean;
  support: boolean;
}

const INITIAL_PERMISSIONS: PermissionRow[] = [
  { permission: 'Catalogue: Create & Edit Products', category: 'Catalogue', superAdmin: true, catalogue: true, warehouse: false, support: false },
  { permission: 'Catalogue: Final Product Approval', category: 'Catalogue', superAdmin: true, catalogue: true, warehouse: false, support: false },
  { permission: 'Inventory: Stock Ledger Adjustment', category: 'Inventory', superAdmin: true, catalogue: false, warehouse: true, support: false },
  { permission: 'Warehouse: Gate Hold / Force Release', category: 'Logistics', superAdmin: true, catalogue: false, warehouse: true, support: false },
  { permission: 'Refunds: Tier 1 Authority (< ₹500)', category: 'Finance', superAdmin: true, catalogue: false, warehouse: false, support: true },
  { permission: 'Refunds: Tier 2 & 3 Authority (> ₹500)', category: 'Finance', superAdmin: true, catalogue: false, warehouse: false, support: false },
  { permission: 'Settings: Modify System Thresholds', category: 'Governance', superAdmin: true, catalogue: false, warehouse: false, support: false },
];

export default function AccessGovernancePage() {
  const { addToast } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'users' | 'matrix' | 'audit' | 'settings'>('users');
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [permissions, setPermissions] = useState<PermissionRow[]>(INITIAL_PERMISSIONS);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(AUDIT_EVENTS);
  const [searchUser, setSearchUser] = useState('');

  // Settings State
  const [deliveryThreshold, setDeliveryThreshold] = useState('499');
  const [autoRefundDays, setAutoRefundDays] = useState('5');
  const [require2FA, setRequire2FA] = useState(true);

  // Invite Modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<SystemUser['role']>('Warehouse & Logistics');

  const handleTogglePermission = (index: number, role: 'catalogue' | 'warehouse' | 'support') => {
    setPermissions((prev) =>
      prev.map((p, idx) => (idx === index ? { ...p, [role]: !p[role] } : p))
    );
    addToast({
      title: 'Permission Matrix Updated',
      description: 'Role access changed. Audit log entry recorded.',
      type: 'info',
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: `Delivery threshold updated to ₹${deliveryThreshold}, auto-refund set to ${autoRefundDays} days.`,
      type: 'success',
    });
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: SystemUser = {
      id: `u-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      facility: 'Coimbatore DC',
      twoFactorEnabled: false,
      lastLogin: 'Never',
      status: 'Active',
    };

    setUsers((prev) => [...prev, newUser]);
    setInviteModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    addToast({
      title: 'Staff Invitation Dispatched',
      description: `Activation invite sent to ${newUser.email}.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Security & Governance</span>
            <span>•</span>
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Access, Accountability & Control
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Manage operational user credentials, 2FA compliance, granular permission matrix, and inspect immutable audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6F04A]" />
            Invite Operations Staff
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E1E8E1] pb-1">
        {[
          { id: 'users', label: 'Authorized Users (5)', icon: Users },
          { id: 'matrix', label: 'Permission Matrix', icon: Key },
          { id: 'audit', label: 'Immutable Audit Trail', icon: FileText },
          { id: 'settings', label: 'Operational Rules', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#07563B] text-white shadow-xs'
                  : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E1E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756F]" />
              <input
                type="text"
                placeholder="Search staff name, email, or role..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:outline-none focus:border-[#07563B]"
              />
            </div>
            <span className="text-[#6B756F] font-semibold">{users.length} active staff members</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                  <th className="py-3 px-4 font-semibold">User Identity</th>
                  <th className="py-3 px-4 font-semibold">Operational Role</th>
                  <th className="py-3 px-4 font-semibold">Facility Node</th>
                  <th className="py-3 px-4 font-semibold">2FA Security</th>
                  <th className="py-3 px-4 font-semibold">Last Login</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E8E1]">
                {users
                  .filter((u) => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase()))
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-[#F7F7F0]/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#202A25]">{u.name}</div>
                        <div className="text-[11px] text-[#6B756F]">{u.email}</div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-[#07563B]">
                        {u.role}
                      </td>

                      <td className="py-3.5 px-4 text-[#6B756F]">
                        {u.facility}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                            u.twoFactorEnabled
                              ? 'bg-[#EAF5E9] text-[#07563B]'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          <Smartphone className="w-3 h-3" />
                          {u.twoFactorEnabled ? 'Enabled' : 'Missing 2FA'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[#6B756F]">
                        {u.lastLogin}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                          {u.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() =>
                            addToast({
                              title: 'Edit Credentials',
                              description: `Managing permissions for ${u.name}`,
                              type: 'info',
                            })
                          }
                          className="px-2.5 py-1 rounded-lg border border-[#E1E8E1] hover:bg-[#EAF5E9] text-[#07563B] font-semibold text-xs transition-colors"
                        >
                          Edit Role
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PERMISSION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E1E8E1] flex justify-between items-center text-xs">
            <div>
              <h3 className="font-bold text-[#202A25]">Role-Based Access Matrix</h3>
              <p className="text-[#6B756F]">Fine-grained privilege assignment across operational portals.</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF5E9] text-[#07563B] font-bold text-xs">
              Live Enforcement Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                  <th className="py-3 px-4 font-semibold">Permission / Resource Action</th>
                  <th className="py-3 px-4 font-semibold text-center">Super Admin</th>
                  <th className="py-3 px-4 font-semibold text-center">Catalogue Mgr</th>
                  <th className="py-3 px-4 font-semibold text-center">Warehouse Mgr</th>
                  <th className="py-3 px-4 font-semibold text-center">Support Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E8E1]">
                {permissions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#F7F7F0]/60">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#202A25]">{p.permission}</div>
                      <div className="text-[10px] text-[#6B756F] uppercase tracking-wider">{p.category}</div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#07563B] mx-auto" />
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.catalogue}
                        onChange={() => handleTogglePermission(idx, 'catalogue')}
                        className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B] h-4 w-4"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.warehouse}
                        onChange={() => handleTogglePermission(idx, 'warehouse')}
                        className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B] h-4 w-4"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.support}
                        onChange={() => handleTogglePermission(idx, 'support')}
                        className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B] h-4 w-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: IMMUTABLE AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E1E8E1] flex justify-between items-center text-xs">
            <h3 className="font-bold text-[#202A25] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#07563B]" />
              Immutable Operational Audit Log
            </h3>
            <span className="text-[#6B756F]">Cryptographically timestamped</span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                <th className="py-2.5 px-4 font-semibold">Actor / User</th>
                <th className="py-2.5 px-4 font-semibold">Action / Event</th>
                <th className="py-2.5 px-4 font-semibold">Details & Target</th>
                <th className="py-2.5 px-4 font-semibold text-right">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              {auditEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#F7F7F0]/60">
                  <td className="py-3 px-4 font-mono text-[#6B756F]">{evt.time}</td>
                  <td className="py-3 px-4 font-bold text-[#202A25]">{evt.user}</td>
                  <td className="py-3 px-4 font-semibold text-[#07563B]">{evt.event}</td>
                  <td className="py-3 px-4 text-[#202A25]">{evt.details}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: OPERATIONAL RULES & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-6 max-w-2xl text-xs">
          <div>
            <h3 className="text-base font-bold text-[#202A25]">Operational Safeguards & Thresholds</h3>
            <p className="text-[#6B756F] mt-0.5">Configure live validation parameters across all warehouse and checkout services.</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#202A25] block">
                Free Delivery Basket Threshold (INR)
              </label>
              <input
                type="number"
                value={deliveryThreshold}
                onChange={(e) => setDeliveryThreshold(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-mono font-bold text-[#202A25] focus:outline-none focus:border-[#07563B]"
              />
              <span className="text-[11px] text-[#6B756F]">Baskets above this value qualify for free doorstep delivery.</span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#202A25] block">
                Customer Auto-Refund Policy Window (Days)
              </label>
              <input
                type="number"
                value={autoRefundDays}
                onChange={(e) => setAutoRefundDays(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-mono font-bold text-[#202A25] focus:outline-none focus:border-[#07563B]"
              />
              <span className="text-[11px] text-[#6B756F]">Maximum elapsed days post-delivery eligible for one-click claim authorization.</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1]">
              <div>
                <strong className="text-[#202A25] block">Enforce 2FA For All Operations Staff</strong>
                <span className="text-[11px] text-[#6B756F]">Require biometric or TOTP authenticator token at login.</span>
              </div>
              <input
                type="checkbox"
                checked={require2FA}
                onChange={(e) => setRequire2FA(e.target.checked)}
                className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B] h-5 w-5"
              />
            </div>

            <div className="pt-3 border-t border-[#E1E8E1] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#07563B] text-white font-bold text-xs hover:bg-[#06452F] flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save Operational Rules
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invite Staff Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E1]">
              <h3 className="text-base font-bold text-[#202A25]">Invite Operations Staff</h3>
              <button onClick={() => setInviteModalOpen(false)} className="text-[#6B756F]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteUser} className="space-y-3">
              <div>
                <label className="font-semibold text-[#202A25] block mb-1">Staff Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs focus:bg-white focus:outline-none focus:border-[#07563B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#202A25] block mb-1">Company Email</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh.k@hypermart.in"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs focus:bg-white focus:outline-none focus:border-[#07563B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#202A25] block mb-1">Assigned Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs focus:bg-white focus:outline-none"
                >
                  <option value="Warehouse & Logistics">Warehouse & Logistics</option>
                  <option value="Catalogue & Merchandising">Catalogue & Merchandising</option>
                  <option value="Customer Care & Finance">Customer Care & Finance</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#E1E8E1]">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E1E8E1] text-[#202A25] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#07563B] text-white font-bold hover:bg-[#06452F]"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
