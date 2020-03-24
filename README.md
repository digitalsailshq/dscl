![Example](https://github.com/digitalsailshq/dscl/blob/master/sublime/example.png "Example")

### How To Install Syntax Highlight For Sublime Text

1. Install Polymer syntax
2. Install PackageDev package
3. Create new syntax by using PackageDev command
4. Paste yaml from "sublime/dscl.sublime-syntax" and save as dscl.sublime-syntax
5. Patch Polymer with:
```yaml
    - match: '{{'
      scope: keyword.other.substitution.begin.js
      embed: scope:source.js
      escape: '}}'
      escape_captures:
        0: keyword.other.substitution.end.js
```
6. Open Monokai color theme and paste block for double curly braces
```json
{
    "name": "double_curly_braces",
    "scope": "punctuation.definition.template.begin.html, punctuation.definition.template.end.html",
    "foreground": "#F92672"
}
```
7. Fladaptive tweak
```
"blue_my": "hsl(210, 15%, 10%)"
```