## What is this?

Loads a Beeves metadata file, a superset of a snips file, on installation.

## Notes on the Beeves metadata file

- contains a snips file describing intents etc.
- contains activation keyword (do we need a global registry mapping activation keywords to beeves enabled extensions to prevent conflicts?)
- for extensions that manipulate the DOM and perform site-specific actions, do we need a list of URIs on which the extension is allowed to perform actions?

Type about:config in the FireFox address bar and find security.csp.enable and set it to false
