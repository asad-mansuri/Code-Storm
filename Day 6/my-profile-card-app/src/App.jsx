import React from 'react';
import ProfileCard from './ProfileCard';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Day 6 Task</h1>
      <div className="cards-container">
        <ProfileCard 
          name="Asad Mansuri"
          photo="https://lh3.googleusercontent.com/a/ACg8ocIg7_939y4-eQNwR1_T5R7RWqS0VrzP_8u7y0Bj93alZe2bNuo=s96-c"
          role="Full Stack Developer"
          bio="Building scalable web applications and exploring new technologies. Coffee enthusiast and open source contributor."
          location="Lalburra, Balaghat"
        />
        
        <ProfileCard 
          name="Yash Paliwal"
          photo="https://wallpapers.com/images/featured-full/cool-boy-anime-y61kpjindsmr277u.jpg"
          role="Frontend Developer"
          bio="Passionate about creating beautiful, user-friendly web applications. Love working with React and modern JavaScript."
          location="Lalburra, Balaghat"
        />
        
        <ProfileCard 
          name="Aditya Tiwari"
          photo="https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660487.jpg?t=st=1756113827~exp=1756117427~hmac=3b2f7c3cab4572a02d58ab3ad4ca9acaf60f8f491bad0e961efa7e6ff927e069&w=1480"
          role="UX/UI Designer"
          bio="Crafting intuitive digital experiences that users love. Always curious about human-computer interaction."
          location="Austin, TX"
        />
        
      </div>
    </div>
  );
}

export default App;