//** Quotes **

function createQuotes({name, pic_url, text, title}) {
  $('#addQuotes').append(`
    <div class="carousel-item">
        <div class="row justify-content-around">
            <div class="col-sm-1">
                <img class="rounded-circle mx-auto my-3 d-block" src="${pic_url}" width="150" height="150" alt="First slide">
            </div>
            <div class="col-sm-6 mx-3">
                <p>${text}</p>
                <p><span class="font-weight-bold">${name}</span><br>
                    <span class="font-italic">${title}</span></p>
            </div>
        </div>
    </div>
    `);
}

function queryQuotes() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/xml/quotes',
    success: function (xml) {
      $(xml).find('quote').each(function () {
        let data = {
          name: $(this).find('name').text(),
          pic_url: $(this).find('pic_url').text(),
          text: $(this).find('text').text(),
          title: $(this).find('title').text()
        }
        createQuotes(data);
      });
      $('.carousel .carousel-item:first').addClass('active');
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// ** TUTORIALS **
function createTutorials(data) {
  let row = 1;
  if (data.id > 4) {
    row = 2;
  }
  $('#addTutorials' + row).append(`
    <div class="mx-1 tutorial${data.id}">
        <div class="card video-card mx-auto my-3">
            <img class="card-img-top" src="${data.thumb_url}" alt="Thumbnail" width="255" height="154">
            <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
            <div class="card-body">
                <p class="font-weight-bold">${data.title}<br>
                    <span class="text-secondary font-14 font-weight-normal">${data.subtitle}</span>
                </p>
                <div class="row justify-content-start font-14 purple-text">
                    <div class="col-2">
                        <img class="rounded-circle" src="${data.author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                    </div>
                    <div class="col mt-1">
                        ${data.author}
                    </div>
                </div>
                <div class="row justify-content-between mt-2">
                    <div class="col" id="stars-${data.id}">
                    </div>
                    <div class="col-4 text-right purple-text">
                        ${data.duration}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);

    for (let i = 0; i < 5; i++) {
    if (i < data.star) {
      $('#stars-' + data.id).append(
        '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
      );
    } else {
      $('#stars-' + data.id).append(
        '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
      );
    }
  }
}

function queryTutorials() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/xml/popular-tutorials',
    contentType: 'json',
    success: function (xml) {
      $(xml).find('video').each(function () {

        let data = {
          id: parseInt($(this).attr('id')),
          star: parseInt($(this).attr('star')),
          duration: $(this).find('duration').text(),
          title: $(this).find('title').text(),
          author: $(this).find('author').text(),
          author_pic_url: $(this).find('author_pic_url').text(),
          thumb_url: $(this).find('thumb_url').text(),
          subtitle: $(this).find('sub-title').text()
        }

        createTutorials(data);
      });
      $('.tutorial2').addClass('d-none d-md-flex');
      $('.tutorial3').addClass('d-none d-lg-flex');
      $('.tutorial4').addClass('d-none d-lg-flex');
      $('.tutorial6').addClass('d-none d-md-flex');
      $('.tutorial7').addClass('d-none d-lg-flex');
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// ** LASTETST **

function createLatest(data) {
  for (let row = 1; row < 3; row++) {
    $('#addLatest' + row).append(`
      <div class="mx-1 tutorial${data.id}">
          <div class="card video-card mx-auto my-3">
              <img class="card-img-top" src="${data.thumb_url}" alt="Thumbnail" width="255" height="154">
              <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
              <div class="card-body">
                  <p class="font-weight-bold">${data.title}<br>
                      <span class="text-secondary font-14 font-weight-normal">${data.subtitle}</span>
                  </p>
                  <div class="row justify-content-start font-14 purple-text">
                      <div class="col-2">
                          <img class="rounded-circle" src="${data.author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                      </div>
                      <div class="col mt-1">
                          ${data.author}
                      </div>
                  </div>
                  <div class="row justify-content-between mt-2">
                      <div class="col" id="stars-latest-${data.id}">
                      </div>
                      <div class="col-4 text-right purple-text">
                          ${data.duration}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `);
  }
  for (let i = 0; i < 5; i++) {
    if (i < data.star) {
      $(`#stars-latest-${data.id}:nth-child(1)`).append(
        '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
      );
    } else {
      $(`#stars-latest-${data.id}:nth-child(1)`).append(
        '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
      );
    }
  }
}


function queryLatest() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/xml/latest-videos',
    contentType: 'json',
    success: function (xml) {
      $(xml).find('video').each(function () {

        let data = {
          id: parseInt($(this).attr('id')),
          star: parseInt($(this).attr('star')),
          duration: $(this).find('duration').text(),
          title: $(this).find('title').text(),
          author: $(this).find('author').text(),
          author_pic_url: $(this).find('author_pic_url').text(),
          thumb_url: $(this).find('thumb_url').text(),
          subtitle: $(this).find('sub-title').text()
        }

        createLatest(data);
      });
      $('.latest2').addClass('d-none d-md-flex');
      $('.latest3').addClass('d-none d-lg-flex');
      $('.latest4').addClass('d-none d-lg-flex');
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}


// ** COURSES **

function createDropdowns(data) {
  $('.topicDefault').html(data.topics[0]);
  $('.sortDefault').html(data.sorts[0].replace('_', ' '));
  data.topics.forEach(function (topic) {
    $('#topicDropdown').append(
      `<a class="dropdown-item" sectionId="${topic}">${topic}</a>`
    );
  });
  data.sorts.forEach(function (sort) {
    $('#sortDropdown').append(
      `<a class="dropdown-item" sectionId="${sort}">${sort.replace(
        '_',
        ' '
      )}</a>`
    );
  });
  $('input').change(function () {
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
  $('#topicDropdown a').click(function () {
    $('.topicDefault').html($(this).attr('sectionId'));
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
  $('#sortDropdown a').click(function () {
    $('.sortDefault').html($(this).attr('sectionId').replace('_', ' '));
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
}

function displayCourseVideos(q, topic, sort) {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/xml/courses',
    dataType: 'xml',
    data: {
      q,
      topic,
      sort,
    },
    success: function (xml) {
      const response = coursesXmlToJson(xml);
      if (response.courses.length == 1) {
        $('#videoCount').html(`1 video`);
      } else {
        $('#videoCount').html(`${response.courses.length} videos`);
      }
      $('#courseResults').empty();
      response.courses.forEach(function (course) {
        $('#courseResults').append(`
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card video-card my-3 mx-2">
                    <img class="card-img-top" src="${course.thumb_url}" alt="Thumbnail" width="255" height="154">
                    <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
                    <div class="card-body">
                        <p class="font-weight-bold">${course.title}<br>
                            <span class="text-secondary font-14 font-weight-normal">${course.subtitle}</span>
                        </p>
                        <div class="row justify-content-start font-14 purple-text">
                            <div class="col-2">
                                <img class="rounded-circle" src="images/profile_1.jpg" width="30" height="30" alt="Profile 1" loading="lazy">
                            </div>
                            <div class="col mt-1">
                                ${course.author}
                            </div>
                        </div>
                        <div class="row justify-content-between mt-2">
                            <div class="col" id="stars-course-${course.id}">
                            </div>
                            <div class="col-4 text-right purple-text">
                                ${course.duration}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        for (let i = 0; i < 5; i++) {
          if (i < course.star) {
            $(`#stars-course-${course.id}:nth-child(1)`).append(
              '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
            );
          } else {
            $(`#stars-course-${course.id}:nth-child(1)`).append(
              '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
            );
          }
        }
      });
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function queryCourses() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/xml/courses',
    dataType: 'xml',
    success: function (response) {
      createDropdowns(coursesXmlToJson(response));
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function coursesXmlToJson(xml) {
  
  let sorts = [];
  $(xml).find('sorts > sort').each(function () {
    sorts.push($(this).text());
  })
  
  let topics = [];
  $(xml).find('topics > topic').each(function () {
    topics.push($(this).text());
  })

  let courses = [];
  $(xml).find('course').each(function () {

    let data = {
      id: parseInt($(this).attr('id')),
      star: parseInt($(this).attr('star')),
      duration: $(this).find('duration').text(),
      title: $(this).find('title').text(),
      author: $(this).find('author').text(),
      author_pic_url: $(this).find('author_pic_url').text(),
      thumb_url: $(this).find('thumb_url').text(),
      subtitle: $(this).find('sub-title').text()
    }

    courses.push(data);
  })


  return {
    topics: topics,
    sorts: sorts,
    topic: $(xml).find('result > topic').text(),
    sort: $(xml).find('result > sort').text(),
    q: $(xml).find('q').text(),
    courses: courses
  }
}

queryQuotes();
queryTutorials();
queryLatest();
queryCourses();
displayCourseVideos();
