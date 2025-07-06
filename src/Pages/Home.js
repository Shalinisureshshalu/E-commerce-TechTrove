import React from 'react';
import chat from '../image/chat.png'; // adjust the path if necessary

function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Tech Trove</h1>
      
      <p style={{ textAlign: 'left', padding: '0 20px' }}>
        Tech Trove is your one-stop destination for all things tech! Explore our wide range of products,
        from the latest gadgets to essential accessories. Whether you're a tech enthusiast or just
        looking for the perfect gift, we've got you covered.
      </p>

      <p style={{ textAlign: 'left', padding: '0 20px' }}>
        Our mission is to provide you with the best tech products at competitive prices, along with
        exceptional customer service. Browse our categories, read reviews, and find the perfect tech
        solution for your needs.
      </p>
      <section>
      </section>
      <img src={chat} alt="Chat" style={{ width: '300px', height: '300px' }} />
       <section>
        <h2>Our Features</h2>
        <ul>
          <li>🔍 Explore curated collections of trending gadgets</li>
          <li>🛒 Seamless shopping experience with secure checkout</li>
          <li>💬 AI-powered chat assistant for personalized help</li>
          <li>📦 Fast and reliable delivery across India</li>
          <li>🌐 Regular tech blogs and reviews to keep you updated</li>
        </ul>
      </section>
      <p>
        Join us on this exciting journey through the world of technology. Happy shopping!
      </p>
    </div>
  );
}

export default Home;

   
