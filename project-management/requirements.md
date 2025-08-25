# Requirements

## Requirements

### Context

We are developing a proof of concept for a standalone 3D configurator that allows users to interactively design advertising pylons. This POC will demonstrate the technical feasibility of real-time 3D configuration with instant price feedback, serving as a foundation for future integration into the company's sales and marketing processes.

### Users / Target Audience

- **B2B Sales Representatives**: Sales staff who need to quickly demonstrate pylon options to clients during meetings or presentations
- **Business Customers**: Company decision-makers evaluating pylon options for their advertising needs
- **Technical Stakeholders**: Internal teams assessing the configurator's integration potential with existing business systems

All users operate on desktop computers with modern browsers and require German-language interface.

### Value Provided

- **Instant Visualization**: Customers can immediately see how their configuration choices affect the final pylon appearance
- **Interactive Exploration**: Users can experiment with different combinations of size, shape, material, and color in real-time
- **Transparent Pricing**: Immediate price feedback helps users make informed decisions within their budget
- **Visual Communication**: 3D models eliminate ambiguity in specifications and reduce miscommunication
- **Sales Efficiency**: Accelerates the sales process by allowing rapid iteration through options during customer meetings

### Functional Requirements

#### FR1: Pylon Size Configuration

- **FR1.1**: User can adjust pylon height within range 1.0m - 8.0m using slider or input field
- **FR1.2**: User can adjust pylon width within range 0.3m - 3.0m using slider or input field
- **FR1.3**: User can adjust pylon depth within range 0.1m - 1.0m using slider or input field
- **FR1.4**: All dimension changes must be reflected in 3D model within 1 second
- **FR1.5**: Current dimensions are displayed numerically with unit "m"

#### FR2: Pylon Shape Configuration

- **FR2.1**: User can select from predefined shapes: rectangular, round, triangular
- **FR2.2**: Shape selection is presented via radio buttons or dropdown
- **FR2.3**: Shape change updates 3D model geometry while preserving current dimensions
- **FR2.4**: Each shape maintains proportional scaling when dimensions are modified

#### FR3: Material Selection

- **FR3.1**: User can select from materials: Metal, Plastic, Composite (displayed as "Metall", "Kunststoff", "Verbundwerkstoff" in German interface)
- **FR3.2**: Material selection affects visual appearance (surface texture/finish) in 3D model
- **FR3.3**: Material selection affects price calculation
- **FR3.4**: Current material choice is clearly indicated in UI

#### FR4: Color Configuration

- **FR4.1**: User can select pylon color using a color picker interface
- **FR4.2**: Color picker supports RGB color space selection
- **FR4.3**: Selected color is immediately applied to 3D model surface
- **FR4.4**: Color picker shows current selected color value

#### FR5: 3D Visualization

- **FR5.1**: 3D pylon model is rendered in real-time in the browser
- **FR5.2**: User can rotate view by clicking and dragging (orbit camera)
- **FR5.3**: User can zoom in/out using mouse wheel or touch gestures
- **FR5.4**: User can pan view by holding modifier key + drag
- **FR5.5**: 3D model updates instantly (< 1 second) when any configuration parameter changes
- **FR5.6**: Model detail level is optimized for real-time performance, not photorealism
- **FR5.7**: Scene includes basic lighting and ground plane for depth perception

#### FR6: Price Display

- **FR6.1**: Current price is displayed prominently in Euro currency (€)
- **FR6.2**: Price updates automatically within 1 second of any configuration change
- **FR6.3**: Price calculation includes all configuration parameters (size, shape, material, color)
- **FR6.4**: Price format: "1.234,56 €" (German decimal separator)

#### FR7: Image Upload

- **FR7.1**: User can upload image files (JPG, PNG) with maximum size 10MB
- **FR7.2**: Uploaded image is displayed on the front face of the 3D pylon model
- **FR7.3**: Image is automatically scaled to fit pylon face while maintaining aspect ratio
- **FR7.4**: User can remove uploaded image to return to base material appearance
- **FR7.5**: System shows upload progress and success/error feedback

#### FR8: Mobile Responsive Layout

- **FR8.1**: Interface adapts to mobile viewport sizes (320px-768px width) with single-column layout
- **FR8.2**: On small screens (xs-s: 320px-639px), all components stack vertically: 3D canvas, headline, each configuration control, summary
- **FR8.3**: On medium screens (m: 640px-1023px), configuration controls use two-column layout while canvas remains above controls
- **FR8.4**: On large screens (l+: 1024px+), current desktop layout with side-by-side canvas and configuration panel is maintained
- **FR8.5**: Touch interactions work properly on mobile devices for 3D navigation and form controls
- **FR8.6**: All text remains readable and controls remain usable on mobile screen sizes
- **FR8.7**: German text content and formatting is preserved across all responsive breakpoints

### Non-functional Requirements

#### NFR1: Performance

- **NFR1.1**: 3D model updates complete within 1 second of user input
- **NFR1.2**: Price calculations complete within 1 second of configuration change
- **NFR1.3**: Initial page load completes within 3 seconds on typical broadband connection
- **NFR1.4**: 3D rendering maintains 30+ FPS during user interactions

#### NFR2: Browser Compatibility

- **NFR2.1**: Supports current versions (last 2 major releases) of Chrome, Firefox, Edge, Safari
- **NFR2.2**: Requires WebGL 2.0 support for 3D rendering
- **NFR2.3**: JavaScript ES2020 features may be used

#### NFR3: Device Support

- **NFR3.1**: Optimized for desktop monitors (1920x1080 minimum resolution)
- **NFR3.2**: Responsive design supports mobile devices (320px minimum width) and tablets
- **NFR3.3**: Supports standard mouse/keyboard interactions on desktop and touch interactions on mobile
- **NFR3.4**: WebGL 3D rendering works on mobile browsers that support WebGL 2.0
- **NFR3.4**: Configuration interface and 3D canvas are simultaneously visible without vertical scrolling on desktop screens

#### NFR4: Localization

- **NFR4.1**: All user interface text in German language
- **NFR4.2**: German number formatting (1.234,56)
- **NFR4.3**: German currency symbol and formatting

#### NFR5: Architecture

- **NFR5.1**: Standalone web application (no external dependencies for POC)
- **NFR5.2**: Code architecture supports future integration into company website
- **NFR5.3**: Component-based structure for maintainability

### Out of Scope for POC

The following features are explicitly excluded from the proof of concept:

- **Configuration Persistence**: Saving or sharing pylon configurations
- **User Authentication**: Account creation, login, or user management
- **Multi-language Support**: Only German interface required
- **Business System Integration**: No connection to ERP, CRM, or pricing systems
- **Photorealistic Rendering**: High-fidelity materials and lighting
- **Advanced Image Editing**: Image cropping, rotation, or effects within the configurator
- **Export Functionality**: Generating technical drawings, specifications, or quotes
- **Order Processing**: Shopping cart, checkout, or order management

### Success Criteria

The POC will be considered successful when:

1. **Technical Feasibility Proven**: 3D configuration works smoothly in target browsers
2. **Performance Targets Met**: All interactions respond within specified time limits
3. **Core User Journey Functional**: User can configure all parameters and see results
4. **Pricing Integration Ready**: Placeholder pricing system demonstrates real-time calculation capability
5. **Stakeholder Validation**: Internal teams confirm architecture supports future integration needs

### Assumptions and Dependencies

#### Assumptions

- Users have modern computers with dedicated graphics cards or integrated graphics capable of WebGL 2.0
- Internet connection provides sufficient bandwidth for initial application loading
- Business stakeholders will provide guidance on realistic parameter ranges and pricing logic
- 3D model complexity can be optimized for real-time performance without losing essential visual fidelity

#### Dependencies

- No external API dependencies for POC phase
- 3D graphics library selection and integration
- Placeholder pricing algorithm development
- Sample product images for testing image upload functionality

### Future Extensions (Post-POC)

Planned enhancements after successful POC validation:

1. **Advanced Visualization**: Lighting conditions, environment contexts
2. **Installation Visualization**: Show pylon in various environmental contexts
