export const addClipboard = (value: string) => {
    try {
        navigator.clipboard
            .writeText(value)
            .then(() => navigator.clipboard.readText())
            .catch((e) => console.log(e, "try err"));

        if (typeof navigator.clipboard == "undefined") {
            var textArea = document.createElement("textarea");
            textArea.value = value;
            textArea.style.position = "fixed"; //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand("copy");
            } catch (err) {}

            document.body.removeChild(textArea);
            return;
        }
    } catch {
        var textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed"; //avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.body.removeChild(textArea);
        return;
    }
};
