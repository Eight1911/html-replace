

function test() {
  let html = `
  <div class="yourself">
    <p class="child"> 
    Take kindly the counsel of the years,<br>
    gracefully surrendering the things of youth. <br>
    Nurture strength of spirit to shield you in sudden misfortune.<br>
    But do not distress yourself with dark imaginings. <br>
    Many fears are born of fatigue and loneliness. <br>
    Beyond a wholesome discipline, <br>
    be gentle with yourself. <br>
    </p>
    <p class="child"> 
    <i>You</i> are a child of the universe, <br>
    no less than the trees and the stars; <br>
    you have a right to be _here_. <br>
    And whether or not it is clear to you, <br>
    no doubt the universe is unfolding as it "should." <br>
    </p>
  </div>`
  let Searcher = require("./replace.js")
  let test = new Searcher(html, true)
  let expected_text = `Take kindly the counsel of the years, gracefully surrendering the things of youth. Nurture strength of spirit to shield you in sudden misfortune. But do not distress yourself with dark imaginings. Many fears are born of fatigue and loneliness. Beyond a wholesome discipline, be gentle with yourself. You are a child of the universe, no less than the trees and the stars; you have a right to be _here_. And whether or not it is clear to you, no doubt the universe is unfolding as it "should."`
  let expected_html = `<div class="yourself"><p class="child">Take kindly the counsel of the years,<br>gracefully surrendering the things of youth.<br>Nurture strength of spirit to shield you in sudden misfortune.<br>But do not distress yourself with dark imaginings.<br>Many fears are born of fatigue and loneliness.<br>Beyond a wholesome discipline,<br>be gentle with yourself.<br></p><p class="child"><i>You</i>are a child of the universe,<br>no less than the trees and the stars;<br>you have a right to be _here_.<br>And whether or not it is clear to you,<br>no doubt the universe is unfolding as it "should."<br></p></div>`
  let altered_text = `Take kindly the counsel of the years, gracefully surrendering the things of weth. Nurture strength of spirit to shield we in sudden misfortune. But do not distress werself with dark imaginings. Many fears are born of fatigue and loneliness. Beyond a wholesome discipline, be gentle with werself. we are a child of the universe, no less than the trees and the stars; we have a right to be _here_. And whether or not it is clear to we, no doubt the universe is unfolding as it "should."`
  let altered_html = `<div class="yourself"><p class="child">Take kindly the counsel of the years,<br>gracefully surrendering the things of weth.<br>Nurture strength of spirit to shield we in sudden misfortune.<br>But do not distress werself with dark imaginings.<br>Many fears are born of fatigue and loneliness.<br>Beyond a wholesome discipline,<br>be gentle with werself.<br></p><p class="child"><i>we</i>are a child of the universe,<br>no less than the trees and the stars;<br>we have a right to be _here_.<br>And whether or not it is clear to we,<br>no doubt the universe is unfolding as it "should."<br></p></div>`


  

  let expected_indx = [76, 120, 166, 290, 300, 371, 436]
  let matches = test.search('you', 'i')
  let rightmatch = (m,i) =>  
           m.s === expected_indx[i]
        && m.e === expected_indx[i] + 3
        && m.text.toLowerCase() === "you"

  console.log(test.text())
  console.log(expected_text)
  if (test.text() !== expected_text)
    throw "failure"
  if (test.html() !== expected_html)
    throw "failure"
  if (!matches.reduce((a, b) => a && b))
    throw "failure"

  test.replaceall(matches, "we")
  if (test.text() !== altered_text)
    throw "failure"
  if (test.html() !== altered_html)
    throw "failure"

  console.log("all tests passed!")
}

test()

