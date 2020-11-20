async function addParagraphDelayed(){
    await new Promise(resolve => setTimeout(resolve, 5000));
    let body = document.getElementsByTagName("body")[0];
    body.innerHTML = body.innerHTML + "<p>This one is added after 5 seconds<p/>";
}

addParagraphDelayed();


