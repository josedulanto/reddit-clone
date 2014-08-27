if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Y Combinator-Backed Traction Is A Marketplace Connecting Brands With Freelance Marketers',
    author: 'Anthony Ha',
    url: 'http://techcrunch.com/2014/08/19/traction-launch/',
    votes: 0,
    created_at: moment().subtract(1, 'days'),
    updated_at: moment().subtract(1, 'days')
  });
  Posts.insert({
    title: 'Google Launches Photo Sphere Camera App On iOS',
    author: 'Sarah Perez',
    url: 'http://techcrunch.com/2014/08/19/google-launches-photo-sphere-camera-on-ios/',
    votes: 0,
    created_at: moment().subtract(2, 'days'),
    updated_at: moment().subtract(2, 'days')
  });
  Posts.insert({
    title: 'This Is The Worst App In The World',
    author: 'Alex Willhelm',
    url: 'http://techcrunch.com/2014/08/19/this-is-the-worst-app-in-the-world/',
    votes: 0,
    created_at: moment().subtract(3, 'days'),
    updated_at: moment().subtract(3, 'days')
  });
}