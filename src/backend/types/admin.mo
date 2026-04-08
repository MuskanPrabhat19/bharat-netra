module {

  public type AdminPrincipal = ?Principal;

  public type AuditLogEntry = {
    id : Nat;
    timestamp : Int;
    action : Text;
    principal_text : Text;
    resource_id : Text;
    resource_title : Text;
  };

  public type AdminResult = {
    #ok : Text;
    #err : Text;
  };

};
