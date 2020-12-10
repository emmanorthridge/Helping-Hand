import React from 'react';

const About = () => {
  return (
    <section className='hero is-white is-fullheight '>
        <div className='column'>
          <body>
            <section class='section'>
              <div class='container'>
                <div className = 'about-title'>
                <img
                  src='/about.png'
                  alt='alternative'
                  width={150}
                  height={150}
                />
                </div>
                <div className = 'about-details'>
                <h2 class='subtitle'>
                  Helping hand is the{' '}
                  <strong>Online Volunteering Community.</strong> Inspired by
                  the events of 2020, our aim is to connect those who have a
                  little extra time with those who need it.
                </h2>
                <h2 class='subtitle'>
                  In this community, users can share their posts for assistance,
                  whether it’s dog walking, gardening, picking up groceries or
                  precriptions- all socially distanced of course! Just state
                  what kind of help you need (don’t forget to mention if it’s
                  recurring i.e. dog walking), and on what days, and then hit
                  ‘Post’.
                </h2>
                <h2 class='subtitle'>
                  Those people with extra time can choose to connect with those
                  needing some help by commenting on the posts.
                </h2>
              </div>
              </div>
            </section>
          </body>
        </div>
    </section>
  );
};

export default About;
