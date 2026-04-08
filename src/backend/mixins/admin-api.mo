import AdminTypes "../types/admin";
import AdminLib "../lib/admin";
import List "mo:core/List";
import Time "mo:core/Time";

// adminState[0] = current admin principal (?Principal)
// auditState holds log entries; nextIdState[0] holds next audit id counter
mixin (
  adminState : List.List<AdminTypes.AdminPrincipal>,
  auditState : List.List<AdminTypes.AuditLogEntry>,
  nextIdState : List.List<Nat>
) {

  /// Stores caller as admin if no admin has been assigned yet.
  public shared ({ caller }) func initAdmin() : async AdminTypes.AdminResult {
    let current = adminState.at(0);
    let (newAdmin, result) = AdminLib.initAdmin(caller, current);
    adminState.put(0, newAdmin);
    result
  };

  /// Returns true if the calling principal is the current admin.
  public query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(caller, adminState.at(0))
  };

  /// Transfers admin to a new principal. Caller must be current admin.
  public shared ({ caller }) func transferAdmin(newPrincipalText : Text) : async AdminTypes.AdminResult {
    let (newAdmin, result) = AdminLib.transferAdmin(caller, adminState.at(0), newPrincipalText);
    switch (result) {
      case (#ok(_)) {
        adminState.put(0, newAdmin);
        let nextId = nextIdState.at(0);
        let newLog = AdminLib.addAuditEntry(
          auditState.toArray(), nextId, Time.now(),
          "transferAdmin", caller.toText(), newPrincipalText, "admin"
        );
        auditState.clear();
        auditState.addAll(newLog.values());
        nextIdState.put(0, nextId + 1);
      };
      case (#err(_)) {};
    };
    result
  };

  /// Returns a paginated slice of the audit log, newest-first.
  public query func getAuditLog(offset : Nat, limit : Nat) : async [AdminTypes.AuditLogEntry] {
    let reversed = auditState.toArray().reverse();
    let total = reversed.size();
    if (offset >= total) return [];
    let end = if (offset + limit > total) total else offset + limit;
    reversed.sliceToArray(offset.toInt(), end.toInt())
  };

  /// Clears the entire audit log. Caller must be admin.
  public shared ({ caller }) func clearAuditLog() : async AdminTypes.AdminResult {
    let (_, result) = AdminLib.clearAuditLog(caller, adminState.at(0), auditState.toArray());
    switch (result) {
      case (#ok(_)) { auditState.clear() };
      case (#err(_)) {};
    };
    result
  };

  /// Returns the text of the current admin principal.
  public query func getAdminPrincipalText() : async Text {
    AdminLib.getAdminPrincipalText(adminState.at(0))
  };

};
