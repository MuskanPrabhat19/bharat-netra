import AdminTypes "../types/admin";
import Principal "mo:core/Principal";

module {

  /// Returns true if caller matches the stored admin principal.
  public func isAdmin(caller : Principal, adminPrincipal : AdminTypes.AdminPrincipal) : Bool {
    switch (adminPrincipal) {
      case (?ap) { Principal.equal(caller, ap) };
      case null { false };
    }
  };

  /// Initialises the admin principal. Only succeeds when no admin is yet assigned.
  public func initAdmin(
    caller : Principal,
    adminPrincipal : AdminTypes.AdminPrincipal
  ) : (AdminTypes.AdminPrincipal, AdminTypes.AdminResult) {
    switch (adminPrincipal) {
      case (?_) { (adminPrincipal, #err("Admin already assigned")) };
      case null { (?(caller), #ok("Admin initialised")) };
    }
  };

  /// Transfers admin to a new principal. Caller must be current admin.
  public func transferAdmin(
    caller : Principal,
    adminPrincipal : AdminTypes.AdminPrincipal,
    newPrincipalText : Text
  ) : (AdminTypes.AdminPrincipal, AdminTypes.AdminResult) {
    if (not isAdmin(caller, adminPrincipal)) {
      return (adminPrincipal, #err("Unauthorised: caller is not admin"));
    };
    // Attempt to parse the principal text — fromText traps on invalid input;
    // we guard with a basic non-empty check first, then parse.
    if (newPrincipalText.size() == 0) {
      return (adminPrincipal, #err("Invalid principal: empty string"));
    };
    let newPrincipal = Principal.fromText(newPrincipalText);
    (?(newPrincipal), #ok("Admin transferred"))
  };

  /// Clears the audit log. Caller must be admin.
  public func clearAuditLog(
    caller : Principal,
    adminPrincipal : AdminTypes.AdminPrincipal,
    _log : [AdminTypes.AuditLogEntry]
  ) : ([AdminTypes.AuditLogEntry], AdminTypes.AdminResult) {
    if (not isAdmin(caller, adminPrincipal)) {
      return (_log, #err("Unauthorised: caller is not admin"));
    };
    ([], #ok("Audit log cleared"))
  };

  /// Appends a new entry to the audit log and returns the updated log.
  public func addAuditEntry(
    log : [AdminTypes.AuditLogEntry],
    nextId : Nat,
    timestamp : Int,
    action : Text,
    principalText : Text,
    resourceId : Text,
    resourceTitle : Text
  ) : [AdminTypes.AuditLogEntry] {
    let entry : AdminTypes.AuditLogEntry = {
      id = nextId;
      timestamp;
      action;
      principal_text = principalText;
      resource_id = resourceId;
      resource_title = resourceTitle;
    };
    log.concat([entry])
  };

  /// Returns the text representation of the admin principal.
  public func getAdminPrincipalText(adminPrincipal : AdminTypes.AdminPrincipal) : Text {
    switch (adminPrincipal) {
      case (?ap) { ap.toText() };
      case null { "none" };
    }
  };

};
