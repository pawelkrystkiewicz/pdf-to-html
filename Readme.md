PDF to HTML
=====
### DESCRIPTION
This solution uses [pdf.js](https://github.com/mozilla/pdf.js) to showcase desired pdf.
Because of JS restricions it is required of files to
be on the same server or source server to have CROS disabled.
For tests it is best to use http-server.  

### KNOWN ISSUES
Behavior across different browser is inconsitent:  
- change of target URL can be sometimes not visible and server reload/reset doesn't help.  
Not an issue if not changing pdf source  

  #####  SOLUTION:
  Cache cleaning is required:  
  Browser's DevTools->Application->Clear site data (select all)
