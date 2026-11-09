# Roles & access

| Role | Can do |
|---|---|
| **Super Admin** (Murad, `t1`) | Everything. Creates/edits/deactivates/deletes any user, including Admins. |
| **Admin** | Sees and edits all instructor cabinets, bookings, meetings. Manages **instructors and students only** (create, edit, reset PIN, deactivate). Cannot touch Admins or Super Admin. |
| **Instructor** | The existing cabinet: own trainings, rooms, chat, materials. |
| **Student** | Read-only portal: lesson materials (view/download) + change own PIN. |

## Where it lives
- `profiles/{username}` in Firestore: `name, title, role, active, ver, createdAt`. Publicly readable (login screen needs names); only managers can write (enforced in `firestore.rules`).
- Login = Firebase Auth e-mail `<username>@trainers.app`, password `tp-<PIN>`.

## PINs
- **User changes own PIN:** "PIN dəyiş" button (any role).
- **Admin resets a PIN:** Dashboard → İstifadəçilər → "PIN sıfırla". Shows a new 6-digit PIN once.
  Technically a new Auth account `<username>.<random>@trainers.app` is created and the profile's `ver` points to it; the old account stops working (rules compare the e-mail with `ver`). This is needed because the browser cannot set another user's password.
- Forgotten PIN = ask an Admin/Super Admin to reset it.

## First run
1. Publish `firestore.rules`.
2. Log in once as Murad (`t1`). The app seeds `profiles` for the 11 existing trainers (t1 = superadmin, others = instructor).
3. Open **İstifadəçilər** to add Admins/Students or promote people (Edit → Rol).

## Limits (by design, no paid backend)
- Deleting a user removes the profile and cabinet data, but the Firebase Auth record stays (harmless: rules deny it).
- All instructors can read the shared `messages` collection (UI shows only their chats).
- 4-digit PINs are weak; prefer 6 digits. Firebase rate-limits sign-in attempts.