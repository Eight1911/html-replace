# h-replace

This is a script for searching and replacing texts in html files 
while preserving element specifications. There is no internal parser, so its a bit rough on the edges. But it's tiny and has no dependencies. 

For example
```js
    let html = `
    <div class="right">
      <p class="child"> 
        Take kindly the counsel of the years,
        gracefully surrendering the things of youth.
        Nurture strength of spirit to shield you in sudden misfortune.
        But do not distress yourself with dark imaginings.
        Many fears are born of fatigue and loneliness.
        Beyond a wholesome discipline,
        be gentle with yourself. 
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

Extract text from html:
```js
    let searcher = new HtmlSearch(html)

    // extract text from html
    let text = searcher.text()

    // this gives `be gentle with yourself. You are a child of the universe, 
    // no less than the trees and the stars; you have a right to be here. And 
    // whether or not it is clear to you, no doubt the universe is unfolding 
    // as it should.`
```

Search for things in the text.
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
    let regex = new RegExp(/(\Ws)/i)
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
