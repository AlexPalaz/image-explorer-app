## Vercel url: https://image-explorer-app.vercel.app/

## Built with: React, Next.js, Supabase, Vercel Deploy

## How to Run Locally

1. After cloning the project, install dependencies by running the following command:

   ```bash
   npm i
   ```

2. Configure an .env.local file in the root folder of the project and apply these variables:

   https://envshare.dev/unseal#oDCEWFGPsa1N7fyUoSudKTLajDYTDYeSBPrx1D25kTAw

   Note: These environment variables are provided temporarily for the purpose of evaluating the Technical Assessment. They will only be available for a limited time (up to 90 days). After the evaluation period, these variables will be removed for security reasons:

## Introduction

Image Explorer App is an application developed to display images from the Unsplash platform, allowing users to interact with the images through features like commenting, adding to favorites, and more. The goal is to provide an intuitive interface for exploring and managing images.

## Key Features

1. **Image Exploring**
   - Dynamic retrieval of images via the Unsplash API.
   - Pagination-based navigation through images.

2. **Comments**
   - Users can add comments to images.

3. **Favorites**
   - Option to add images to favorites.
   - View the list of favorites in a dedicated section.

4. **Authentication**
   - User registration/login with email and password (email confirmation not required).

## Usage

1. **Navigation**
   - **Home**: Paginated display of images fetched from Unsplash using a Masonry layout. By entering a keyword in the search bar, users can retrieve related images. If no keyword is entered, random images with a random keyword will be loaded.
   - **Detail**: By clicking on an image from the home page, users are redirected to the image's detail page, where additional information about the image is displayed.
   - **Comment**: On the detail page, users can view and add comments, which are persisted in the database (Supabase). Note: You must be authenticated to comment.
   - **Favorites**: On the detail page, users can add an image to their favorites by clicking the heart button. Once added to favorites, users can view their list of favorites in the "Favorites" section. Note: You must be authenticated to add or view favorites.

## Architecture

### **Frontend**

The frontend of the app is built with **Next.js 15**, utilizing **Context API** for state management, particularly to handle the dynamic display of images and pagination. Context API is ideal in this case because it allows for centralized state management, making it easier to pass down state through the component tree, especially for components that need to update or react to the images displayed and user interactions.

For pages that require dynamic content fetching (like the **Detail** and **Favorites** pages), **Server Side Rendering (SSR)** is employed. SSR ensures that the content is generated on the server side before being sent to the client, which helps with SEO and initial page load performance. This also improves the user experience by displaying the content more quickly.

The app leverages **Server Actions** in combination with **Next Form** to handle form submissions for adding comments and saving favorite images. Using Server Actions ensures that these operations (such as saving comments or toggling favorites) are handled securely on the server side, keeping sensitive operations away from the client.

### **Backend**

The backend is built using **Next.js API Route Handlers**. API routes in Next.js allow you to create serverless functions that can handle requests like any backend server, but without the need for managing a separate server. These handlers are used to:

- Make API calls to **Unsplash** to retrieve images.
- Communicate with **Supabase** to store comments and favorites.
- Handle authentication securely by interacting with Supabase’s auth API.

Since API routes in Next.js are server-side by default, the sensitive API calls (such as interacting with the Unsplash API and Supabase) are hidden from the client-side, providing an extra layer of security by preventing the exposure of authentication tokens and API keys.

### **Authentication**

Authentication is handled through **Supabase**, which provides an easy-to-use authentication system with support for email and password sign-ups. The authentication flow does not require email confirmation, simplifying the registration process. Users can log in using their email and password, and once authenticated, they can interact with the app’s comment and favorite functionalities.

### **Database and Data Management**

The data for user comments, favorites, and session management is stored in a **PostgreSQL** database hosted on **Supabase**.

- **Comments** are stored in a dedicated table within Supabase and are associated with the specific images users comment on.
- **Favorites** are managed similarly, with users’ favorite images being stored in the database, allowing them to be retrieved and displayed on the **Favorites** page.

### **API Security**

All interactions with the **Unsplash API** and **Supabase** are handled securely through the **Next.js API Route Handlers**. This approach prevents sensitive API keys and authentication tokens from being exposed on the client-side. By calling these external services from the server, you ensure that all tokens are kept safe and only passed to the server when necessary.

In summary:

- **Frontend**: Next.js 15, Context API for state management, SSR for Detail and Favorites pages.
- **Backend**: Next.js API Route Handlers for interacting with Unsplash and Supabase securely.
- **Authentication**: Supabase email/password-based authentication, no email confirmation.
- **Database**: Supabase PostgreSQL database for storing user comments and favorites.
- **Security**: API calls to external services (Unsplash and Supabase) are managed server-side via Next.js API Routes to prevent exposure of sensitive data.
