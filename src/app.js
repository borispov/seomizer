import { Researcher, Paper } from "yoastseo";
import assessment from "yoastseo/src/assessment";

const paper = new Paper( 
  "The Best SEO Tool for text analysis is inarguable ahrefs. This is far the best seo tool. I have never imagined going to a party and not being served a quality drink. I was offered numerous times to get on board, and I really do think it is the best seo tool",
  {
    title: "9 Best Seo Tools for managers",
    keyword: "seo tool",
  },
);

paper.keyword = 'The BEST SEO Tool';
paper.title = "9 best seo tools for managers and freelancers"

paper.getKeyword()


const researcher = new Researcher( paper );
const wordCount = researcher.getResearch( "wordCountInText" );
const keywordCount = researcher.getResearch( 'keywordCount' );
const outboundLinks = researcher.getResearch( "outboundLinks" );
const inboundLinks = researcher.getResearch( "inboundLinks" );
const flesch = researcher.getResearch( "calculateFleschReading" );
const metaDescLen = researcher.getResearch( "metaDescriptionLength" );
const keywordInMeta = researcher.getResearch( "metaDescriptionKeyword" );
// const pageTitleLen = researcher.getResearch( 'pageTitleWidth' );
const pageTitleLen = charCount(paper.title);

const rules = {
  'outboundLinks': function(value) {
    return value >= 4 && value <= 10
      ? {
        msg: `Your article links to ${value} of external links. It's considered good as long as outbound links are to authority and helpful links`,
        value: "good"
      } : {
        msg: `Consider adding outbound links. Only add links that make sense and provide value`,
        value: "bad"
      }
  },
  pageTitleWidth: function (value) {
    return value <= 65 && value >= 35
      ? {
        msg: "The page title is in the perfect range (35 < x < 65)",
        value: "good"
      } : {
        msg: `The recommended page title length is between 35(min) and 65(max) yours is: ${value}`,
        value: "bad"
      }
  },
  keywordInMeta: function(value) {
    return value >= 1 && value <= 2
      ? {
        msg: "Your meta description includes between 1 and 2 keywords, it's recommended",
        value: "good"
      } : {
        msg: "Either you have 0 keywords in your meta description, or over 2 keywords which is too much"
      }
  }
}

function calculateRating(rule, value) {
  return rules[rule](value)
}

const rulesToAssess = [
  {
    rule: 'pageTitleWidth',
    value: pageTitleLen
  },
  {
    rule: 'keywordInMeta',
    value: keywordInMeta
  },
  {
    rule: 'outboundLinks',
    value: outboundLinks
  }
  
]

rulesToAssess.forEach(rule => {
  const result = calculateRating(rule.rule, rule.value)
  console.log(`--- \n ${result.msg} \n`)
})


function charCount(str) {
  return str.split(" ").join("").length;
}