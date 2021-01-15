import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='homepage'>
      
      <section className='hero is-white is-fullheight '>
        <div className='hero-body container'>
          <div className='container'>
            <div className = "homepage-title">
            <div className='title'>
              <img
                  src='/hand2.png'
                  alt='alternative'
                  width={750}
                  height={750}
                />
              <div className='second-title'>
                <h2>Become a local Hero in your neighbourhood today</h2>
              </div>
            </div>
            </div>
            <div className='columns is-vcentered'>
              <div className='column is-7'>
                <img
                  src='/superman.png'
                  alt='alternative'
                  width={350}
                  height={30}
                />
              </div>


              <div className='column is-3'>
                <div className='quote'>
                  <p>
                    Inspired by the events of 2020, we connect those who have a
                    little extra time with those who need it.
                  </p>
                  <div className='second-quote'>
                    <p>
                      <Link
                        className='button is-danger'
                        to='/signup'
                        style={{ textDecoration: 'none' }}
                      >
                        <strong>Sign up</strong>
                      </Link>{' '}
                      today to share your posts for help or find people who need
                      your assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
