module {

  public type ArticleId = Nat;
  public type StreamId = Nat;

  public type BiasIndicator = {
    #Low;
    #Medium;
    #High;
  };

  public type SourceReliability = {
    #High;
    #Medium;
    #Low;
    #NotSet;
  };

  public type Classification = {
    #Fact;
    #Opinion;
    #Unverified;
  };

  public type StreamStatus = {
    #Live;
    #Upcoming;
    #Ended;
  };

  public type PropagandaAnalysis = {
    emotional_manipulation : Bool;
    selective_facts : Bool;
    fear_based_language : Bool;
    ideological_pushing : Bool;
    suggested_rewrite : ?Text;
  };

  public type Article = {
    id : ArticleId;
    headline : Text;
    summary : Text;
    body : Text;
    category : Text;
    author : Text;
    source_outlet : Text;
    publication_date : Int;
    truth_score : Nat;
    source_reliability_score : Nat;
    fact_completeness_score : Nat;
    no_contradiction_flag : Nat;
    bias_indicator : BiasIndicator;
    source_reliability : SourceReliability;
    classification : Classification;
    propaganda_analysis : PropagandaAnalysis;
    published : Bool;
  };

  public type ArticleInput = {
    headline : Text;
    summary : Text;
    body : Text;
    category : Text;
    author : Text;
    source_outlet : Text;
    publication_date : Int;
    source_reliability_score : Nat;
    fact_completeness_score : Nat;
    no_contradiction_flag : Nat;
    bias_indicator : BiasIndicator;
    source_reliability : SourceReliability;
    classification : Classification;
    propaganda_analysis : PropagandaAnalysis;
  };

  public type LiveStream = {
    id : StreamId;
    title : Text;
    description : Text;
    source : Text;
    status : StreamStatus;
    start_time : Int;
    embed_url : Text;
    published : Bool;
  };

  public type LiveStreamInput = {
    title : Text;
    description : Text;
    source : Text;
    status : StreamStatus;
    start_time : Int;
    embed_url : Text;
  };

  public type DashboardStats = {
    total_articles : Nat;
    verified_count : Nat;
    unverified_count : Nat;
    opinion_count : Nat;
    low_bias_count : Nat;
    medium_bias_count : Nat;
    high_bias_count : Nat;
    propaganda_alert_count : Nat;
    high_reliability_count : Nat;
    medium_reliability_count : Nat;
    low_reliability_count : Nat;
    last_updated : Int;
  };

};
