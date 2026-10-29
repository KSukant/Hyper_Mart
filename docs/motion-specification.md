# HyperMart Operations Hub — Motion, Cursor & Interaction Specification

This document defines the physics, interaction ergonomics, timing curves, and animation standards for the HyperMart Operations Hub.

---

## 1. Interaction Principles

The Operations Hub is an enterprise high-throughput retail management application. Motion serves strictly functional purposes:
1. **State Feedback**: Immediate tactile confirmation of clicks, drags, and submissions.
2. **Spatial Continuity**: Clarifying where items come from (e.g., drawers sliding from right, dropdowns anchoring to buttons).
3. **Hierarchy of Attention**: Guiding the user’s eye to urgent operational exceptions without causing visual fatigue.
4. **Performance & Restraint**: No continuous looping animations, no bouncy rubber-band physics, and zero lag on tabular data.

---

## 2. Standard Motion Tokens

| Token Name | Duration | Easing Curve | Use Case |
|:---|:---:|:---:|:---|
| `motion-instant` | `80ms` | `linear` | Checkbox toggles, radio buttons, active state press |
| `motion-fast` | `140ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Button hovers, icon highlights, pill focus rings |
| `motion-standard` | `200ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Dropdown menus, popovers, tooltip appearances |
| `motion-enter` | `260ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page content entrance, card fade-up, modal dialogs |
| `motion-drawer` | `280ms` | `cubic-bezier(0.2, 0, 0, 1)` | Right-hand slide-over drawers |
| `motion-stagger` | `40ms` | — | Sequential delay between cards/KPI elements |

---

## 3. Cursor & Pointer Ergonomics

- **Default State**: Native system arrow cursor.
- **Clickable Controls**: `cursor: pointer` applied strictly to real actions (buttons, dropdown triggers, table row actions, links).
- **Non-Interactive Cards**: `cursor: default` (do not falsely imply clickability on passive metric cards).
- **Input Fields**: Native text selection beam (`cursor: text`).
- **Disabled Buttons**: `cursor: not-allowed` with reduced opacity (`opacity-50`).
- **Resizing/Draggable Splitters**: `cursor: col-resize`.

---

## 4. Micro-Interactions

### Buttons
- **Hover**: Background color shift (140ms ease-out). No continuous scaling.
- **Active Press**: Subtle scale down to `0.98` (`active:scale-[0.98] transition-transform duration-75`).
- **Focus**: Distinct focus ring (`focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2`).

### Interactive Cards
- **Hover**: 
  - Border transitions to `border-emerald-300/80`.
  - Subtle upward translation of `1.5px` (`hover:-translate-y-0.5`).
  - Restrained elevation shadow shift (`shadow-sm` → `shadow-md`).
  - Duration: `180ms`.

### Table Rows
- **Hover**: Background transition to pale mint `bg-emerald-50/40`.
- Row height and column widths remain strictly static.
- Action icons reveal with opacity transition `0.5` → `1.0`.

### Dropdown Menus & Popovers
- Anchored directly below the trigger element.
- Initial state: `opacity: 0, translateY: -4px`.
- Open state: `opacity: 1, translateY: 0` (160ms).
- Close state: `opacity: 0, translateY: -2px` (120ms).

### Drawers & Modals
- **Drawer**: Translates smoothly from `translateX(100%)` to `translateX(0)` over `280ms`.
- **Backdrop**: Fades from `opacity: 0` to `opacity: 1` (`bg-black/30 backdrop-blur-xs`) over `200ms`.
- **Escape Key**: Automatically dismisses open drawer or modal and restores focus to triggering control.

---

## 5. Page Load & Stagger Sequences

When entering an administrative route:
1. Persistent Sidebar & Top Bar remain stationary without re-rendering or flashing.
2. Main content viewport enters with an organic stagger:
   - Step 1 (0ms): Page Header & Action Bar (`fade-up`, `translateY: 8px`).
   - Step 2 (40ms): KPI Row (all cards together with subtle stagger).
   - Step 3 (80ms): Main workspace tables or control towers.
   - Step 4 (120ms): Secondary panels / right widgets.
3. Total entrance completes in under `320ms`, ensuring zero perceived operational latency.

---

## 6. Accessibility & Reduced Motion

When the user has `prefers-reduced-motion: reduce` configured:
- All transitions switch to instantaneous or opacity-only fades (`duration: 100ms`).
- All `translateY` and `scale` transforms are disabled.
- Stagger delays are set to `0ms`.
- Drawer slides are replaced by an immediate clean opacity fade.
