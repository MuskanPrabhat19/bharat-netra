import Types "types/news-articles";
import AdminTypes "types/admin";
import NewsArticlesApi "mixins/news-articles-api";
import AdminApi "mixins/admin-api";
import NewsArticlesLib "lib/news-articles";
import Migration "migration";
import List "mo:core/List";
import Time "mo:core/Time";

(with migration = Migration.run)
actor {

  let articles = List.empty<Types.Article>();
  let streams = List.empty<Types.LiveStream>();

  // Shared mutable state containers (size-1 lists act as mutable cells)
  // adminState[0] = current admin principal (?Principal)
  let adminState = List.singleton<AdminTypes.AdminPrincipal>(null);
  let auditState = List.empty<AdminTypes.AuditLogEntry>();
  let nextIdState = List.singleton<Nat>(0);

  var seeded : Bool = false;

  func seedData() {
    if (seeded) return;
    seeded := true;

    var nextArticleId : Nat = 0;
    var nextStreamId : Nat = 0;

    // --- 8 seed articles ---

    // Politics 1: FACT, high score ~85
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "Parliament Passes Digital Infrastructure Bill 2026";
      summary = "The Lok Sabha passed the Digital Infrastructure Bill 2026 with a two-thirds majority, allocating ₹2.4 lakh crore for rural broadband and 5G rollout over five years.";
      body = "After three days of debate, the Digital Infrastructure Bill 2026 was passed by the Lok Sabha with 412 votes in favour and 73 against. The bill mandates nationwide 5G coverage by 2028 and earmarks dedicated funds for rural last-mile connectivity. Opposition parties raised concerns over spectrum allocation transparency but did not oppose the core objectives.";
      category = "Politics";
      author = "Priya Sharma";
      source_outlet = "The Hindu";
      publication_date = Time.now();
      source_reliability_score = 90;
      fact_completeness_score = 85;
      no_contradiction_flag = 80;
      bias_indicator = #Low;
      source_reliability = #High;
      classification = #Fact;
      propaganda_analysis = {
        emotional_manipulation = false;
        selective_facts = false;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = null;
      };
    });
    nextArticleId += 1;

    // Politics 2: OPINION, medium score ~42
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "New Tax Policy Will Destroy Middle Class, Critics Warn";
      summary = "Opposition leaders claim the revised income-tax slabs unfairly burden salaried employees while large corporations enjoy widened exemptions.";
      body = "Several opposition MPs and economists have voiced strong concern over the Finance Ministry's updated tax framework. Critics argue that while the headline rate appears unchanged, the removal of key deductions effectively raises the burden on middle-income households. Government officials counter that the simplification reduces compliance costs and benefits the formal sector overall. Independent analysts note the data is mixed and projections differ significantly based on assumptions.";
      category = "Politics";
      author = "Rahul Verma";
      source_outlet = "Outlook India";
      publication_date = Time.now();
      source_reliability_score = 55;
      fact_completeness_score = 35;
      no_contradiction_flag = 35;
      bias_indicator = #High;
      source_reliability = #Medium;
      classification = #Opinion;
      propaganda_analysis = {
        emotional_manipulation = true;
        selective_facts = true;
        fear_based_language = false;
        ideological_pushing = true;
        suggested_rewrite = ?"Revised tax slabs have drawn mixed reactions; independent analysis suggests varied impact across income brackets depending on deduction usage.";
      };
    });
    nextArticleId += 1;

    // Science 1: FACT, high score ~91
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "ISRO Successfully Tests Reusable Launch Vehicle Landing Autonomously";
      summary = "ISRO's RLV-TD completed a fully autonomous landing at Chitradurga aeronautical test range, marking a landmark milestone in India's reusable space launch ambitions.";
      body = "The Indian Space Research Organisation confirmed that its Reusable Launch Vehicle Technology Demonstrator (RLV-TD) executed a precise autonomous runway landing during its latest mission on 7 April 2026. The vehicle, guided entirely by onboard AI navigation, touched down within 10 metres of the target centreline. ISRO Chairman Dr. V. Narayanan stated the test validates key technologies for a fully reusable orbital launch system expected by 2030.";
      category = "Science";
      author = "Ananya Krishnan";
      source_outlet = "ISRO Official / Indian Express";
      publication_date = Time.now();
      source_reliability_score = 95;
      fact_completeness_score = 90;
      no_contradiction_flag = 88;
      bias_indicator = #Low;
      source_reliability = #High;
      classification = #Fact;
      propaganda_analysis = {
        emotional_manipulation = false;
        selective_facts = false;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = null;
      };
    });
    nextArticleId += 1;

    // Science 2: UNVERIFIED, low score ~33
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "Scientists Claim Breakthrough Cold Fusion Experiment Achieved in Pune Lab";
      summary = "An unverified report circulating on social media claims researchers at an unnamed Pune laboratory achieved sustained cold fusion at room temperature.";
      body = "A document circulating on social media purports to describe a cold fusion experiment conducted at a private research facility in Pune. The claims have not been published in any peer-reviewed journal, and no institutional affiliation has been confirmed. The scientific consensus continues to hold that cold fusion as described has not been reproducibly demonstrated. Bharat Netra has been unable to independently verify the identities of the researchers or the facility's existence.";
      category = "Science";
      author = "Desk Report";
      source_outlet = "Unverified Social Media Claim";
      publication_date = Time.now();
      source_reliability_score = 15;
      fact_completeness_score = 40;
      no_contradiction_flag = 45;
      bias_indicator = #Medium;
      source_reliability = #Low;
      classification = #Unverified;
      propaganda_analysis = {
        emotional_manipulation = false;
        selective_facts = true;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = ?"Unverified claim: a document on social media alleges a cold fusion experiment in Pune; no peer-reviewed publication or institutional verification exists.";
      };
    });
    nextArticleId += 1;

    // Sports 1: FACT, score ~78
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "India Clinches IPL 2026 Season Opener with Record Run Chase";
      summary = "Mumbai Indians defeated Chennai Super Kings by 4 wickets in a thrilling 218-run chase at Wankhede Stadium, the highest successful run chase in IPL history.";
      body = "In a pulsating Indian Premier League opener at Wankhede Stadium, Mumbai Indians overhauled Chennai Super Kings' total of 217/4 with 2 balls to spare, achieving the highest successful run chase in the tournament's history. Rohit Sharma top-scored with 94 off 48 balls. Official scorecards confirmed by the BCCI show accurate figures. Attendance was recorded at 33,000 by stadium authorities.";
      category = "Sports";
      author = "Deepak Nair";
      source_outlet = "Cricinfo / BCCI";
      publication_date = Time.now();
      source_reliability_score = 88;
      fact_completeness_score = 75;
      no_contradiction_flag = 70;
      bias_indicator = #Low;
      source_reliability = #High;
      classification = #Fact;
      propaganda_analysis = {
        emotional_manipulation = false;
        selective_facts = false;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = null;
      };
    });
    nextArticleId += 1;

    // Sports 2: OPINION, score ~55
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "Virat Kohli's Test Retirement Will Cripple Indian Batting for a Decade";
      summary = "Several former cricketers and commentators argue Kohli's potential Test retirement would leave an irreplaceable void in India's middle-order.";
      body = "Following speculation about Virat Kohli's future in Test cricket, a number of commentators have offered sharply divergent opinions. Some former players believe no current batter can replicate his match-winning ability in overseas conditions, while others point to a deep talent pool and Shubman Gill's rapid development as reasons for confidence. Kohli himself has not announced any decision. The debate reflects genuine uncertainty rather than established fact.";
      category = "Sports";
      author = "Sanjay Raut";
      source_outlet = "Times of India Sports";
      publication_date = Time.now();
      source_reliability_score = 65;
      fact_completeness_score = 50;
      no_contradiction_flag = 50;
      bias_indicator = #Medium;
      source_reliability = #Medium;
      classification = #Opinion;
      propaganda_analysis = {
        emotional_manipulation = true;
        selective_facts = false;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = ?"Opinions on the impact of Kohli's potential Test retirement vary widely among experts; no announcement has been made.";
      };
    });
    nextArticleId += 1;

    // Health 1: FACT, score ~88
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "AIIMS Study Confirms Weekly 150-Minute Exercise Reduces Cardiovascular Risk by 35%";
      summary = "A peer-reviewed AIIMS cohort study of 12,000 adults found that meeting WHO exercise guidelines reduced the 10-year cardiovascular event risk by 35% across all age groups.";
      body = "A large-scale longitudinal study conducted by the All India Institute of Medical Sciences, published in the Indian Journal of Medical Research, followed 12,000 adults across six cities over eight years. Participants who consistently met the WHO-recommended 150 minutes of moderate aerobic exercise per week showed a 35% reduction in composite cardiovascular events including heart attack and stroke. The findings are consistent with global meta-analyses and have been peer-reviewed by independent cardiologists.";
      category = "Health";
      author = "Dr. Meena Pillai";
      source_outlet = "AIIMS / Indian Journal of Medical Research";
      publication_date = Time.now();
      source_reliability_score = 95;
      fact_completeness_score = 88;
      no_contradiction_flag = 82;
      bias_indicator = #Low;
      source_reliability = #High;
      classification = #Fact;
      propaganda_analysis = {
        emotional_manipulation = false;
        selective_facts = false;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = null;
      };
    });
    nextArticleId += 1;

    // Health 2: UNVERIFIED, score ~64
    ignore NewsArticlesLib.submitArticle(articles, nextArticleId, {
      headline = "Ayurvedic Supplement Claimed to Reverse Type-2 Diabetes in 30 Days";
      summary = "A viral social media campaign promotes an Ayurvedic formulation claiming complete reversal of Type-2 diabetes within 30 days, with no clinical trial data available.";
      body = "A supplement marketed under the brand name 'GlucoReset' has gained significant social media traction with testimonials claiming full reversal of Type-2 diabetes. The manufacturer has not published results from any registered clinical trial, and the product has not received a therapeutic claim approval from CDSCO. Some general dietary and lifestyle changes associated with Ayurveda do have supportive evidence for glycaemic management, but the specific 30-day reversal claim lacks scientific substantiation. Patients are advised to consult qualified physicians before altering prescribed medication.";
      category = "Health";
      author = "Desk Report";
      source_outlet = "Social Media / Consumer Alert";
      publication_date = Time.now();
      source_reliability_score = 55;
      fact_completeness_score = 65;
      no_contradiction_flag = 72;
      bias_indicator = #Medium;
      source_reliability = #Low;
      classification = #Unverified;
      propaganda_analysis = {
        emotional_manipulation = true;
        selective_facts = true;
        fear_based_language = false;
        ideological_pushing = false;
        suggested_rewrite = ?"A supplement claims to reverse Type-2 diabetes in 30 days; no clinical trial data supports this claim. Consult a physician before changing prescribed treatment.";
      };
    });
    ignore nextArticleId + 1;

    // --- 3 seed live streams ---

    // Stream 1: LIVE
    ignore NewsArticlesLib.submitStream(streams, nextStreamId, {
      title = "Budget Session 2026 – Live Coverage";
      description = "Live broadcast of the Union Budget Session 2026 proceedings from Parliament House, New Delhi.";
      source = "Rajya Sabha TV";
      status = #Live;
      start_time = Time.now();
      embed_url = "https://www.youtube.com/embed/live_stream?channel=RajyaSabhaTV";
    });
    nextStreamId += 1;

    // Stream 2: UPCOMING
    ignore NewsArticlesLib.submitStream(streams, nextStreamId, {
      title = "Supreme Court Hearing – Civic Rights Case";
      description = "Upcoming live coverage of the Supreme Court constitutional bench hearing on civic digital rights and data privacy.";
      source = "DD National";
      status = #Upcoming;
      start_time = Time.now() + 7_200_000_000_000;
      embed_url = "https://www.youtube.com/embed/live_stream?channel=DDNational";
    });
    nextStreamId += 1;

    // Stream 3: ENDED
    ignore NewsArticlesLib.submitStream(streams, nextStreamId, {
      title = "ISRO Press Conference Recap";
      description = "Recorded replay of the ISRO press conference following the successful RLV-TD autonomous landing mission.";
      source = "ISRO Official";
      status = #Ended;
      start_time = Time.now() - 86_400_000_000_000;
      embed_url = "https://www.youtube.com/embed/isro_rlv_recap";
    });
    ignore nextStreamId + 1;
  };

  seedData();

  include AdminApi(adminState, auditState, nextIdState);
  include NewsArticlesApi(articles, streams, adminState, auditState, nextIdState);

};
