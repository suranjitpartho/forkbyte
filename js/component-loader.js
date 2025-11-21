async function loadComponents() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            const html = await response.text();

            // Create a temporary container
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Convert to array to avoid live collection issues during replacement
            const newNodes = Array.from(temp.childNodes);

            // Replace the placeholder
            el.replaceWith(...newNodes);

            // Initialize Alpine on the new nodes if Alpine is available
            if (window.Alpine) {
                newNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        Alpine.initTree(node);
                    }
                });
            }
        } catch (error) {
            console.error(error);
            el.innerHTML = `<div style="color:red">Error loading ${file}: ${error.message}</div>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', loadComponents);
