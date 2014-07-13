// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var TimeTracker = {
  init: function() {
    this.loadExistingTaskList();
  },
  
  loadExistingTaskList: function() {
    var ttTasks = localStorage["tt-tasks"] || "[]";
		ttTasks = JSON.parse(ttTasks);
		$.each(ttTasks, function( index, title ) {
      var time = localStorage[title];
      TimeTracker.appendTask(title, time);
      //$("timer").timer({ action: "resume", seconds: 3 })
    });
  },
  
  appendTask: function(title, time){
    time = time || 0;
    
    var action_btn = '<button class="mini-btn start" type="button">Start</button>';
    
    //action_btn = '<button class="mini-btn stop" type="button">stop</button>';
    if(time > 0) {
      action_btn = '<button class="mini-btn resume" type="button">Resume</button>';
    }
    var inner_html = '' +
      '<div class="task row"><div class="title">'+title+'</div>' +
        '<div>' +
          '<div class="timer" data-ttseconds="'+time+'">-----</div>' +
          action_btn +
        '</div>' +
      '</div>';
		$('#tasks').append($(inner_html));
  }
};

jQuery(function($) {
  TimeTracker.init();
	$('#new-task').on('click', function(e) {
		if(!($("#save").length > 0)) {
			var inner_html = '<div class="feature-btns">' +
				'<label for="title">Task name</label><input type="text" id="title" placeholder="Title of task">' +
				'<button class="btn" type="button" id="save">Save</button>' +
				'<button class="btn float-right" type="button" id="cancel">Cancel</button>';
			$('.container .feature-btns:last').before($(inner_html));
		}
		$("#title").focus();
	});
	
	$('.container').on('click', '.start', function(e) {
	  $(this).prev('.timer').timer('start');
	  $(this).removeClass('start resume').addClass('stop').text('Stop');
	})
	
	$('.container').on('click', '.resume', function(e) {
	  $(this).prev('.timer').timer('resume');
	  $(this).removeClass('start resume').addClass('stop').text('Stop');
	})
	
	$('.container').on('click', '.stop', function(e) {
	  $(this).prev('.timer').timer('pause');
	  $(this).removeClass('stop resume').addClass('start').text('Start');
	})
	
	$('.container').on('click', '#cancel', function(e) {
	  $(this).closest('.feature-btns').remove();
	});

	$('.container').on('click', '#save', function(e) {
		var title = $('#title').val();
		if($.trim(title)=='') {alert('please enter task title');return;}
		var ttTasks = localStorage["tt-tasks"] || "[]";
		ttTasks = JSON.parse(ttTasks);
		ttTasks.push(title);
		localStorage["tt-tasks"] = JSON.stringify(ttTasks);
    TimeTracker.appendTask(title);
		$('#title').val('');
	});
});
