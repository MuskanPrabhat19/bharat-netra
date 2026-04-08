import Types "../types/news-articles";
import AdminTypes "../types/admin";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {

  public func getArticles(
    articles : List.List<Types.Article>
  ) : [Types.Article] {
    articles.toArray()
  };

  public func getPublishedArticles(
    articles : List.List<Types.Article>
  ) : [Types.Article] {
    articles.filter(func(a) { a.published }).toArray()
  };

  public func getArticle(
    articles : List.List<Types.Article>,
    id : Types.ArticleId
  ) : ?Types.Article {
    articles.find(func(a) { a.id == id })
  };

  public func submitArticle(
    articles : List.List<Types.Article>,
    nextId : Nat,
    input : Types.ArticleInput
  ) : Types.ArticleId {
    let truth_score = (input.source_reliability_score + input.fact_completeness_score + input.no_contradiction_flag) / 3;
    let article : Types.Article = {
      id = nextId;
      headline = input.headline;
      summary = input.summary;
      body = input.body;
      category = input.category;
      author = input.author;
      source_outlet = input.source_outlet;
      publication_date = input.publication_date;
      truth_score;
      source_reliability_score = input.source_reliability_score;
      fact_completeness_score = input.fact_completeness_score;
      no_contradiction_flag = input.no_contradiction_flag;
      bias_indicator = input.bias_indicator;
      source_reliability = input.source_reliability;
      classification = input.classification;
      propaganda_analysis = input.propaganda_analysis;
      published = true;
    };
    articles.add(article);
    nextId
  };

  public func toggleArticlePublished(
    articles : List.List<Types.Article>,
    id : Types.ArticleId,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    var found = false;
    var newPublished = false;
    articles.mapInPlace(func(a) {
      if (a.id == id) {
        found := true;
        newPublished := not a.published;
        { a with published = not a.published }
      } else { a }
    });
    if (found) {
      #ok(if (newPublished) "Article published" else "Article unpublished")
    } else {
      #err("Article not found")
    }
  };

  public func deleteArticle(
    articles : List.List<Types.Article>,
    id : Types.ArticleId,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    let sizeBefore = articles.size();
    let filtered = articles.filter(func(a) { a.id != id });
    if (filtered.size() == sizeBefore) {
      return #err("Article not found");
    };
    articles.clear();
    articles.append(filtered);
    #ok("Article deleted")
  };

  public func updateArticle(
    articles : List.List<Types.Article>,
    id : Types.ArticleId,
    input : Types.ArticleInput,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    var found = false;
    articles.mapInPlace(func(a) {
      if (a.id == id) {
        found := true;
        let truth_score = (input.source_reliability_score + input.fact_completeness_score + input.no_contradiction_flag) / 3;
        {
          a with
          headline = input.headline;
          summary = input.summary;
          body = input.body;
          category = input.category;
          author = input.author;
          source_outlet = input.source_outlet;
          publication_date = input.publication_date;
          truth_score;
          source_reliability_score = input.source_reliability_score;
          fact_completeness_score = input.fact_completeness_score;
          no_contradiction_flag = input.no_contradiction_flag;
          bias_indicator = input.bias_indicator;
          source_reliability = input.source_reliability;
          classification = input.classification;
          propaganda_analysis = input.propaganda_analysis;
        }
      } else { a }
    });
    if (found) { #ok("Article updated") } else { #err("Article not found") }
  };

  public func getStreams(
    streams : List.List<Types.LiveStream>
  ) : [Types.LiveStream] {
    streams.toArray()
  };

  public func getPublishedStreams(
    streams : List.List<Types.LiveStream>
  ) : [Types.LiveStream] {
    streams.filter(func(s) { s.published }).toArray()
  };

  public func submitStream(
    streams : List.List<Types.LiveStream>,
    nextId : Nat,
    input : Types.LiveStreamInput
  ) : Types.StreamId {
    let stream : Types.LiveStream = {
      id = nextId;
      title = input.title;
      description = input.description;
      source = input.source;
      status = input.status;
      start_time = input.start_time;
      embed_url = input.embed_url;
      published = true;
    };
    streams.add(stream);
    nextId
  };

  public func toggleStreamPublished(
    streams : List.List<Types.LiveStream>,
    id : Types.StreamId,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    var found = false;
    var newPublished = false;
    streams.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        newPublished := not s.published;
        { s with published = not s.published }
      } else { s }
    });
    if (found) {
      #ok(if (newPublished) "Stream published" else "Stream unpublished")
    } else {
      #err("Stream not found")
    }
  };

  public func deleteStream(
    streams : List.List<Types.LiveStream>,
    id : Types.StreamId,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    let sizeBefore = streams.size();
    let filtered = streams.filter(func(s) { s.id != id });
    if (filtered.size() == sizeBefore) {
      return #err("Stream not found");
    };
    streams.clear();
    streams.append(filtered);
    #ok("Stream deleted")
  };

  public func updateStream(
    streams : List.List<Types.LiveStream>,
    id : Types.StreamId,
    input : Types.LiveStreamInput,
    adminPrincipal : AdminTypes.AdminPrincipal,
    caller : Principal
  ) : { #ok : Text; #err : Text } {
    if (not isAdminCaller(caller, adminPrincipal)) {
      return #err("Unauthorised: caller is not admin");
    };
    var found = false;
    streams.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        {
          s with
          title = input.title;
          description = input.description;
          source = input.source;
          status = input.status;
          start_time = input.start_time;
          embed_url = input.embed_url;
        }
      } else { s }
    });
    if (found) { #ok("Stream updated") } else { #err("Stream not found") }
  };

  public func getDashboardStats(
    articles : List.List<Types.Article>,
    lastUpdated : Int
  ) : Types.DashboardStats {
    var total_articles : Nat = 0;
    var verified_count : Nat = 0;
    var unverified_count : Nat = 0;
    var opinion_count : Nat = 0;
    var low_bias_count : Nat = 0;
    var medium_bias_count : Nat = 0;
    var high_bias_count : Nat = 0;
    var propaganda_alert_count : Nat = 0;
    var high_reliability_count : Nat = 0;
    var medium_reliability_count : Nat = 0;
    var low_reliability_count : Nat = 0;

    articles.forEach(func(a) {
      total_articles += 1;
      switch (a.classification) {
        case (#Fact) { verified_count += 1 };
        case (#Unverified) { unverified_count += 1 };
        case (#Opinion) { opinion_count += 1 };
      };
      switch (a.bias_indicator) {
        case (#Low) { low_bias_count += 1 };
        case (#Medium) { medium_bias_count += 1 };
        case (#High) { high_bias_count += 1 };
      };
      switch (a.source_reliability) {
        case (#High) { high_reliability_count += 1 };
        case (#Medium) { medium_reliability_count += 1 };
        case (#Low) { low_reliability_count += 1 };
      };
      let p = a.propaganda_analysis;
      if (p.emotional_manipulation or p.selective_facts or p.fear_based_language or p.ideological_pushing) {
        propaganda_alert_count += 1;
      };
    });

    {
      total_articles;
      verified_count;
      unverified_count;
      opinion_count;
      low_bias_count;
      medium_bias_count;
      high_bias_count;
      propaganda_alert_count;
      high_reliability_count;
      medium_reliability_count;
      low_reliability_count;
      last_updated = lastUpdated;
    }
  };

  // --- Private helpers ---

  func isAdminCaller(caller : Principal, adminPrincipal : AdminTypes.AdminPrincipal) : Bool {
    switch (adminPrincipal) {
      case (?ap) { Principal.equal(caller, ap) };
      case null { false };
    }
  };

};
