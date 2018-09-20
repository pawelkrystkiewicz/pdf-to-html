/*
PDF TO HTML
Pawel Krystkiewicz
Working URLs for tests - tested using http-server
Use your own server path to files!
*/
var url = 'static/paleo.pdf';
//var url = "https://cdn.mozilla.net/pdfjs/tracemonkey.pdf";

/*
DESCRIPTION:
This solution uses pdf.js tool to showcase desired pdf.
Because of JS restricions it is required of files to
be on the same server or source server to have CROS disabled.
For tests it is best to use http-server.

KNOWN BUGS:
Behavior across different browser is inconsitent:
*change of target URL can be sometimes not visible and server reload/reset doesn't help.
SOLUTION:
cache cleaning is required:
Browser's DevTools->Application->Clear site data (select all)
*/

// Load document
PDFJS.getDocument(url).then(
    function (doc) {
        var promise = Promise.resolve();
        for (var i = 0; i < doc.numPages; i++) {
            // One-by-one load pages
            promise = promise.then(function (id) {
                return doc.getPage(id + 1).then(function (pdfPage) {
                    // Add div with page view.
                    var SCALE = 1; //adjust to your pdf - this value is adjusted 1920px screen width
                    var pdfPageView = new PDFJS.PDFPageView({
                        container: container,
                        id: id,
                        scale: SCALE,
                        defaultViewport: pdfPage.getViewport(SCALE),
                        //Enable text/annotations layers, if needed:
                        textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
                        //annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
                    });

                    //Hook pdf page to DOM and draw it
                    pdfPageView.setPdfPage(pdfPage);
                    return pdfPageView.draw();
                });
            }.bind(null, i));
        }
        return promise;
    });