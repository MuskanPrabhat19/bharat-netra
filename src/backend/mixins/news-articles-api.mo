import Types "../types/news-articles";
import AdminTypes "../types/admin";
import NewsArticlesLib "../lib/news-articles";
import AdminLib "../lib/admin";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  articles : List.List<Types.Article>,
  streams : List.List<Types.LiveStream>,
  adminState : List.List<AdminTypes.AdminPrincipal>,
  auditState : List.List<AdminTypes.AuditLogEntry>,
  nextIdState : List.List<Nat>
) {

  var nextArticleId : Nat = 0;
  var nextStreamId : Nat = 0;

  // --- Helpers ---

  func appendAudit(action : Text, principalText : Text, resourceId : Text, resourceTitle : Text) {
    let nextId = nextIdState.at(0);
    let newLog = AdminLib.addAuditEntry(
      auditState.toArray(), nextId, Time.now(),
      action, principalText, resourceId, resourceTitle
    );
    auditState.clear();
    auditState.addAll(newLog.values());
    nextIdState.put(0, nextId + 1);
  };

  // --- Public read queries ---

  public query func getArticles() : async [Types.Article] {
    NewsArticlesLib.getArticles(articles)
  };

  public query func getPublishedArticles() : async [Types.Article] {
    NewsArticlesLib.getPublishedArticles(articles)
  };

  public query func getArticle(id : Types.ArticleId) : async ?Types.Article {
    NewsArticlesLib.getArticle(articles, id)
  };

  public query func getStreams() : async [Types.LiveStream] {
    NewsArticlesLib.getStreams(streams)
  };

  public query func getPublishedStreams() : async [Types.LiveStream] {
    NewsArticlesLib.getPublishedStreams(streams)
  };

  public query func getDashboardStats() : async Types.DashboardStats {
    NewsArticlesLib.getDashboardStats(articles, Time.now())
  };

  // --- Admin-protected mutations ---

  public shared ({ caller }) func adminSubmitArticle(input : Types.ArticleInput) : async { #ok : Types.ArticleId; #err : Text } {
    if (not AdminLib.isAdmin(caller, adminState.at(0))) {
      return #err("Unauthorised: caller is not admin");
    };
    let id = NewsArticlesLib.submitArticle(articles, nextArticleId, input);
    nextArticleId += 1;
    appendAudit("adminSubmitArticle", caller.toText(), id.toText(), input.headline);
    #ok(id)
  };

  public shared ({ caller }) func adminSubmitStream(input : Types.LiveStreamInput) : async { #ok : Types.StreamId; #err : Text } {
    if (not AdminLib.isAdmin(caller, adminState.at(0))) {
      return #err("Unauthorised: caller is not admin");
    };
    let id = NewsArticlesLib.submitStream(streams, nextStreamId, input);
    nextStreamId += 1;
    appendAudit("adminSubmitStream", caller.toText(), id.toText(), input.title);
    #ok(id)
  };

  public shared ({ caller }) func toggleArticlePublished(id : Types.ArticleId) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.toggleArticlePublished(articles, id, adminState.at(0), caller);
    switch (result) {
      case (#ok(msg)) { appendAudit("toggleArticlePublished", caller.toText(), id.toText(), msg) };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func toggleStreamPublished(id : Types.StreamId) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.toggleStreamPublished(streams, id, adminState.at(0), caller);
    switch (result) {
      case (#ok(msg)) { appendAudit("toggleStreamPublished", caller.toText(), id.toText(), msg) };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func deleteArticle(id : Types.ArticleId) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.deleteArticle(articles, id, adminState.at(0), caller);
    switch (result) {
      case (#ok(_)) { appendAudit("deleteArticle", caller.toText(), id.toText(), "article") };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func deleteStream(id : Types.StreamId) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.deleteStream(streams, id, adminState.at(0), caller);
    switch (result) {
      case (#ok(_)) { appendAudit("deleteStream", caller.toText(), id.toText(), "stream") };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func updateArticle(id : Types.ArticleId, input : Types.ArticleInput) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.updateArticle(articles, id, input, adminState.at(0), caller);
    switch (result) {
      case (#ok(_)) { appendAudit("updateArticle", caller.toText(), id.toText(), input.headline) };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func updateStream(id : Types.StreamId, input : Types.LiveStreamInput) : async { #ok : Text; #err : Text } {
    let result = NewsArticlesLib.updateStream(streams, id, input, adminState.at(0), caller);
    switch (result) {
      case (#ok(_)) { appendAudit("updateStream", caller.toText(), id.toText(), input.title) };
      case (#err(_)) {};
    };
    result
  };

};
