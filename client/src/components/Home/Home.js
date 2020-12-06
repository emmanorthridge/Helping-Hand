import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='homepage'>
      <section className='hero is-primary is-fullheight '>
        <div className='hero-body container'>
          <div className='container'>
            <div className='title'>
              <h1 className='main-title'>Helping Hand</h1>
              <div className='second-title'>
                <h2>Become a Hero in your local neighbourhood today</h2>
              </div>
            </div>
            <div class='columns is-vcentered'>
              <div class='column is-7'>
                <img
                  src='/superman.png'
                  alt='alternative'
                  width={500}
                  height={500}
                />
              </div>

              <div class='column is-3'>
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
