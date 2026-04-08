import NewTypes "types/news-articles";
import List "mo:core/List";

module {

  // Old types — copied inline from .old/src/backend/types/news-articles.mo
  type OldBiasIndicator = { #Low; #Medium; #High };
  type OldSourceReliability = { #High; #Medium; #Low };
  type OldClassification = { #Fact; #Opinion; #Unverified };
  type OldStreamStatus = { #Live; #Upcoming; #Ended };
  type OldPropagandaAnalysis = {
    emotional_manipulation : Bool;
    selective_facts : Bool;
    fear_based_language : Bool;
    ideological_pushing : Bool;
    suggested_rewrite : ?Text;
  };

  type OldArticle = {
    id : Nat;
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
    bias_indicator : OldBiasIndicator;
    source_reliability : OldSourceReliability;
    classification : OldClassification;
    propaganda_analysis : OldPropagandaAnalysis;
  };

  type OldLiveStream = {
    id : Nat;
    title : Text;
    description : Text;
    source : Text;
    status : OldStreamStatus;
    start_time : Int;
    embed_url : Text;
  };

  type OldActor = {
    articles : List.List<OldArticle>;
    streams : List.List<OldLiveStream>;
    seeded : Bool;
  };

  type NewActor = {
    articles : List.List<NewTypes.Article>;
    streams : List.List<NewTypes.LiveStream>;
    seeded : Bool;
  };

  public func run(old : OldActor) : NewActor {
    let articles = old.articles.map<OldArticle, NewTypes.Article>(
      func(a) { { a with published = true } }
    );
    let streams = old.streams.map<OldLiveStream, NewTypes.LiveStream>(
      func(s) { { s with published = true } }
    );
    {
      articles;
      streams;
      seeded = old.seeded;
    };
  };

};
