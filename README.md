# **Point Blank - Official Website**

Welcome to the **Point Blank** official website repository! This project serves as the landing page for Point Blank, showcasing our achievements, initiatives, and much more.

---

## **Quick Links**  
- **Previous Website**: [GitHub](https://github.com/pbdsce/landing-page) | [Live Landing Page](https://www.pointblank.club/)  
- **Issues to Get Started**: [GitHub Issues](https://github.com/pbdsce/pbwebsite/issues)

---

## **Getting Started**  

Follow the steps below to set up the project locally:  

### **1. Clone the Repository**  
```bash
git clone https://github.com/pbdsce/pbwebsite.git
cd pbwebsite
```

### **2. Install Dependencies**  
Install all required dependencies using your preferred package manager:  
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### **3. Set Up Firebase Configuration**  
To connect the project to Firebase, you need a `.env.local` file in the root directory.  

#### Create the `.env.local` file:
```plaintext
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx
```

**Note**: Replace the `xxx` values with the Firebase configuration keys.  
Contact one of the maintainers to obtain the Firebase config details.  

### **4. Run the Development Server**  
Start the development server with one of the following commands:  
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).  

---

## **Contributing**  

1. Fork this repository.  
2. Create a new branch for your feature or bug fix:  
   ```bash
   git checkout -b feature/<feature-name>
   ```  
3. Make your changes and commit them:  
   ```bash
   git commit -m "Add feature: <feature-description>"
   ```  
4. Push your branch and submit a Pull Request to the main repository:  
   ```bash
   git push origin feature/<feature-name>
   ```  

Check the [Issues](https://github.com/pbdsce/pbwebsite/issues) page for tasks you can pick up!  

---

## **Contact**  
If you have any questions or need assistance, feel free to reach out to the maintainers.  

Let’s build something amazing! 🚀  

---  