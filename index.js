const regex = /<pre[^>]*>([\s\S]*?)<\/pre>/igm;

hexo.extend.filter.register('after_post_render', data => {
    if (regex.test(data.content)) {
        data.content = data.content.replace(regex, (str, group1) => {
            return str.replace(group1, '<button hidden tabindex="-1" aria-hidden="true">Copy</button>' + group1)
        })
    }
    
    data.content += `
        <script>
            document.querySelectorAll("pre button").forEach(function(button) {
                button.hidden = false
                button.addEventListener("click", function(e) {
                    var range = document.createRange()
                    range.selectNode(e.target.nextElementSibling)
                    window.getSelection().removeAllRanges()
                    window.getSelection().addRange(range)
                    document.execCommand("copy")
                    window.getSelection().removeAllRanges()

                    button.innerText = 'Copied!'

                    setTimeout(function() {
                        button.innerText = 'Copy'
                    }, 1500)
                })          
            })
        </script>
    `
}, 9)
