# Task 10: WordPress Iframe Integration with Auto-Height Adjustment

## Description

Implement production-ready code to embed the 3D pylon configurator inside WordPress pages using iframe with automatic height adjustment. The iframe must communicate with the parent WordPress page using postMessage to eliminate scrollbars and provide seamless integration.

This task enables the configurator to be embedded into company marketing pages and blog posts while maintaining full functionality and responsive behavior.

## Acceptance Criteria

### AC1: Iframe Detection and Context Awareness

- **AC1.1**: App detects when running inside an iframe context using `window.parent !== window`
- **AC1.2**: App maintains full functionality when embedded in iframe (all existing features work)
- **AC1.3**: Layout optimizations are applied when in iframe context (no duplicate headers/footers if needed)
- **Automation**: Component test verifies iframe detection logic works correctly

### AC2: PostMessage Height Communication

- **AC2.1**: App calculates its total content height and sends height data to parent via postMessage
- **AC2.2**: Height messages are sent within 500ms of content size changes (configuration panel changes, mobile orientation)
- **AC2.3**: Height calculation includes all visible content (3D canvas, configuration panel, any margins/padding)
- **AC2.4**: Messages use structured format: `{ type: 'pylon-configurator-height', height: number, id?: string }`
- **Automation**: Component test verifies postMessage communication sends correct height data

### AC3: Simple Integration Example

- **AC3.1**: Basic HTML/JavaScript example added to README.md showing iframe usage
- **AC3.2**: Example includes iframe with proper attributes (no scrolling, security settings)
- **AC3.3**: Example includes JavaScript to listen for height messages and adjust iframe
- **AC3.4**: Simple integration instructions with 3-4 bullet points for setup
- **Manual**: Example works when tested in a basic HTML file

### AC4: Responsive Behavior in Iframe

- **AC4.1**: All responsive breakpoints work correctly within iframe context
- **AC4.2**: Height adjustments occur automatically when user switches between mobile/desktop orientations
- **AC4.3**: Mobile touch interactions work properly within iframe
- **AC4.4**: No horizontal scrollbars appear in iframe at any responsive breakpoint
- **Manual**: Implementation provides testing instructions for responsive behavior verification

### AC5: Error Handling and Fallback

- **AC5.1**: App gracefully handles scenarios where postMessage fails or parent doesn't respond
- **AC5.2**: Fallback behavior ensures app remains functional even without height communication
- **AC5.3**: No JavaScript errors occur when parent window doesn't implement message handling
- **Manual**: Implementation provides testing instructions for error scenario verification

## Implementation Notes

### Key Technical Components

1. **IframeIntegration Hook/Component**: 
   - Detect iframe context
   - Calculate content height using ResizeObserver or similar
   - Send postMessage communication to parent
   - Handle height changes on configuration updates

2. **Simple Integration Example**:
   - Basic HTML/JavaScript example in README.md
   - Shows iframe setup with postMessage listener
   - Simple setup instructions for any website

3. **Height Calculation System**:
   - Monitor configuration panel size changes
   - Account for responsive layout changes
   - Include canvas resize events
   - Debounce height calculations to avoid excessive messages

4. **Integration Documentation**:
   - README.md section with iframe embedding example
   - Basic setup instructions for any website
   - Simple HTML file for testing

### Testing Strategy

- **Component Tests**: Iframe detection, postMessage communication, height calculations
- **E2E Tests**: Basic iframe workflow, responsive behavior
- **Manual Testing**: Integration example in HTML file, different browser contexts

### Dependencies

- Existing responsive layout system (Task 9)
- Current configuration panel architecture
- Three.js canvas resize handling
- PostMessage browser API support

### Risk Considerations

- Cross-origin security restrictions
- Browser support for postMessage API
- Performance impact of height monitoring

## Implementation Checklist

- [ ] Create iframe detection utilities
- [ ] Implement height calculation system with ResizeObserver
- [ ] Build postMessage communication layer
- [ ] Add integration example to README.md
- [ ] Add automated tests for iframe functionality
- [ ] Test responsive behavior in iframe context
- [ ] Create simple HTML test file
- [ ] Document integration instructions

## Files to Create/Modify

### Expected New Files
- `/app/hooks/useIframeIntegration.ts` - Custom hook for iframe context and height communication
- `/test-iframe.html` - Simple HTML file for testing iframe integration

### Expected Modified Files
- `/app/page.tsx` - Add iframe integration hook usage
- `/app/components/PylonViewer.tsx` - Height monitoring for canvas changes
- `/app/components/ConfigurationPanel.tsx` - Height monitoring for panel changes
- `/README.md` - Add iframe integration example and instructions

### Expected Test Files
- `/cypress/component/IframeIntegration.cy.tsx` - Component tests for iframe functionality
- `/cypress/e2e/iframeIntegration.cy.ts` - E2E tests for iframe workflow
