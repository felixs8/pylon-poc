# Pylon Configurator POC

## About This Project

This is a proof of concept for an interactive 3D advertising pylon configurator that enables B2B sales teams and customers to design custom advertising pylons in real-time. The application provides instant 3D visualization of pylon configurations with German-language interface and transparent pricing feedback.

## Getting Started

This project follows a quality-focused development process where a **human vibe coder** works together with **AI agents** to build the system step by step through structured thinking and clear communication.  
Instead of relying on past conversations, we store all relevant context in a set of **artifacts** inside the repository. These artifacts act as the shared memory of the project. They explain what we want to build, how we plan to build it, what “done” means, what we have built so far, and which tasks remain.

The advantage is that any AI agent—or any human contributor—can join the project at any time, read the artifacts, and immediately understand the current state without needing additional explanations. This makes development transparent, consistent, and agent-agnostic.

You will find the following artifacts in this repository under `project-management/`:

- `project-management/guidelines.md` – explains the process and the role of each artifact. **Start here.**
- `project-management/requirements.md` – describes what we want to build.
- `project-management/target_architecture.md` – shows how we intend to build it.
- `project-management/current_architecture.md` – records what exists in the system right now.
- `project-management/definition_of_done.md` – defines what counts as finished work.
- `project-management/tasks/` – contains one file per task, documenting progress incrementally.

Reading `project-management/guidelines.md` first will help you understand the process and how to contribute.

## Iframe Integration

The 3D Pylon Configurator can be embedded into any website (including WordPress) using an iframe with automatic height adjustment. The configurator detects when it's running in an iframe context and communicates its content height to the parent page via postMessage.

### Basic Integration Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website with Pylon Configurator</title>
    <style>
        .configurator-container {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .configurator-iframe {
            width: 100%;
            height: 800px; /* Better initial height to minimize resize flash */
            border: none;
            transition: height 0.2s ease-out; /* Smoother, faster transition */
            min-height: 600px; /* Prevent iframe from being too small */
        }
    </style>
</head>
<body>
    <h1>Custom Pylon Design</h1>
    
    <div class="configurator-container">
        <iframe
            id="pylon-configurator"
            class="configurator-iframe"
            src="https://your-domain.com"
            title="3D Pylon Configurator"
            allowfullscreen
        ></iframe>
    </div>

    <script>
        // Enhanced message listener with loading state
        let isLoaded = false;
        
        window.addEventListener('message', function(event) {
            // Verify origin in production for security
            // if (event.origin !== 'https://your-domain.com') return;
            
            const data = event.data;
            if (data && data.type === 'pylon-configurator-height') {
                const iframe = document.getElementById('pylon-configurator');
                if (iframe && data.height > 0) {
                    iframe.style.height = data.height + 'px';
                    
                    // Hide loading indicator on first height message
                    if (!isLoaded) {
                        isLoaded = true;
                        const container = iframe.closest('.configurator-container');
                        if (container) {
                            container.classList.remove('loading');
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
```

### Integration Instructions

1. **Add the iframe** to your HTML page using the example above
2. **Include the JavaScript** to listen for height messages from the configurator
3. **Update the src URL** to point to your deployed configurator instance
4. **Verify origin** in the message listener for security in production environments

### WordPress Integration

For WordPress sites, add the HTML and JavaScript to:
- Custom HTML blocks in the page editor
- Theme template files
- Custom post types or pages
- Widget areas that support HTML content

The configurator will automatically hide its header when embedded in an iframe for a cleaner integration experience.
