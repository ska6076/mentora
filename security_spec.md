# Firebase Security Test-Driven Design (TDD) Specification

This document lays down the strict security rules and safety invariants for the Mentora Tutors Hub Firestore database.

## 1. Security Invariants

1. **User Privacy**: No user can read or write to private user document paths of other users. Only the owner (`userId == request.auth.uid`) can access their private document.
2. **Access-Locked Resources**: reference books (`/books/{bookId}`) and model papers (`/papers/{paperId}`) are read-only. Only verified administrators can create, update or delete these catalogs. Registered and logged-in consumers have exclusive read-only privileges.
3. **Role Lock**: No user can elevate their role from `parent` to `tutor`, change their verified state (`isVerified`) or alter administrative attributes of their own profiles after registration.
4. **Time & Origin Integrity**: `createdAt` and `updatedAt` headers are fully timestamp-locked to `request.time`.

## 2. The "Dirty Dozen" (Vulnerability Paylogs)

The following malicious writes must generate `PERMISSION_DENIED` errors on validation:
1. User attempts to register with another user's auth UID in write endpoint.
2. User attempts to change `role` after creation.
3. User attempts to self-verify `isVerified = true` to spoof academic credentials.
4. User tries to execute `read` queries on client side fetching all users without filtration.
5. User attempts to bypass validation string length constraints, inserting 1MB block data into `fullName` attributes.
6. User attempts to update books or paper resources directly.
7. User attempts to alter `createdAt` fields in existing profile records.
8. External attacker attempts to construct document paths with highly malicious long URI strings to trigger Wallet Denial.
9. Attacker attempts to upload fake timestamps instead of server-authenticated clocks.
10. Tutors attempt to read complete parent/child associations of other users.
11. Attacker attempts to modify system parameters inside metadata records.
12. Guest user attempts to read locked study resources before authentication.

## 3. Test Assertions

These are mapped dynamically in firestore.rules testing.
