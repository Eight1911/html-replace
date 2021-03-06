# HTML Search and Replace

This is a script for searching and replacing texts in html files 
while preserving element specifications. There is no internal parser, so it's a bit rough on the edges. But it's tiny and has no dependencies. Implemented using a heap to map between indices of substrings in the extracted text and indices of the same substrings in the html string.

For example
```js
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
        you have a right to be here. <br>
        And whether or not it is clear to you, <br>
        no doubt the universe is unfolding as it should. <br>
      </p>
    </div>`
```

Extract text from html.
```js
    let searcher = new HtmlSearch(html)

    // extract text from html
    let text = searcher.text()

    // this gives `be gentle with yourself. You are a child of the universe, 
    // no less than the trees and the stars; you have a right to be here. And 
    // whether or not it is clear to you, no doubt the universe is unfolding 
    // as it should.`
```

Search for things in the text. Note that the class of div (yourself) does not match the search, which is want we want.
```js
    // find yourself lol
    let matches = searcher.search("yourself")
    // [ { text: 'yourself', s: 166, e: 174 }, { text: 'yourself', s: 290, e: 298 } ]
    // match.s == start index
    // match.e == end index
```

The match is actually a regex match. So, it's possible to do something like this to get all words that start with the letter "s" or the letter "S". 
```js
    let matches = searcher.search("\Ws", "i")
    // this is equivalent to
    let regex = new RegExp("(\Ws)", "i")
    let matches = searcher.search(regex)
```
In fact, all string searches are converted into regexes before being used. Finally, to replace a string, first do a search, then feed the match object into the replace function. This replaces the second occurence of the word "yourself".
```js
    let matches = searcher.search("\Ws", "i")
    searcher.replace(matches[1], "others")
```
Since each replace might off set the search index. We also offer a way to efficiently replace all matches at once. To selectively replace something, just filter the match list.
```js
    let matches = searcher.search("\Ws", "i")
    searcher.replaceall(matches, "others")
```
To get the recover html, simply do
```js
    searcher.html()
```
We do not provide a method to prettify the html since there are other libraries that do that.
