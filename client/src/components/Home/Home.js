import React from 'react';

const Home = () => {
  return (
    <div className='homepage'>
      <section className='hero is-success is-fullheight '>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title is-size-1'>Helping Hand</h1>
            <h2 className='subtitle'>The Online Volunteering Community</h2>
            <img src='/community.png' alt='alternative' width={700} height={700} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
