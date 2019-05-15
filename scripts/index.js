$( document ).ready(function() {
  var numberOfColumns = 0;
  $('.col-wrapper[data-column="1"]').show();
  
  $(".add-column").click(function() {
    $(this).slideUp('normal');
    let column = $(this).attr('data-column');
    $(`.create-column[data-column="${column}"]`).slideDown('normal');
  });
  
  $(".close-button").click(function() {
    let column = $(this).parent().attr('data-column');
    $(`.add-column[data-column="${column}"]`).slideDown('normal');
    $(`.create-column[data-column="${column}"]`).slideUp('normal');
  });
  
  $(".create-column-button").click(function() {
    let column = $(this).parent().attr('data-column');
    let columnName = $(`.create-column[data-column="${column}"] input`).val();
    $(`.create-column[data-column="${column}"] input`).val('');
    if (columnName === "") {
      return;
    } else {
      $(`.create-column[data-column="${column}"]`).slideUp('normal');
      $(`.column[data-column="${column}"]`)
        .html(`<h3>${columnName}</h3>
              <div class="cards" data-column="${column}">
                <div class="card empty-card"></div>
              </div>
              <div class="add-card" data-column="${column}">
                <span><img class="plus-img" src="images/plus.svg" alt="Добавить"> Добавить еще одну карточку</span>
              </div>
              <div class="create-card" data-column="${column}">
                <textarea class="card-name-input" type="text" placeholder="Введите название карточки"></textarea>
                <button class="create-card-button">Добавить карточку</button>
                <button class="card-close-button"><img src="images/cross.svg" alt="Закрыть"></button>
              </div>`);
      
      $(`.cards[data-column="${column}"]`).children().last()
        .draggable({
          helper: function() {
            var width = $(this).outerWidth();
            return $(this).clone().appendTo("body").width(width);
          },
          revert: true,
          start: function(e, ui) {
            $(this).hide();
          },
          stop: function(e, ui) {
            $(this).show();
          }
        })
        .droppable({
          accept: function(el) {
              return el.hasClass("card")
          },
          drop: function(e, ui) {
            $(e.target).after(ui.draggable[0]);
            
            $(ui.draggable[0]).show().css('animation-play-state', 'running');
            
            setTimeout(function() {
              $(ui.draggable[0]).css('animation-play-state', 'paused');
            }, 1000);
            
            $(this).removeClass("over").css('margin-bottom', '8px');
          },
          over: function(e, ui) {
            $(this).addClass("over").css('margin-bottom', '53px');
          },
          out: function(e, ui) {
            $(this).removeClass("over").css('margin-bottom', '8px');
          },

        });

      $(`.col-wrapper[data-column="${parseInt(column) + 1}"]`).slideDown('normal');
    }
  });
  
 
  $(document).on('click', '.add-card', function() {
    $(this).slideUp('normal').addClass('active');;
    let column = $(this).attr('data-column');
    $(`.create-card[data-column="${column}"]`).slideDown('normal');
  });
  
  $(document).on('click', '.card-close-button', function() {
    let column = $(this).parent().attr('data-column');
    $(`.add-card[data-column="${column}"]`).slideDown('normal');
    $(`.create-card[data-column="${column}"]`).slideUp('normal');
  });
  
  $(document).on("click", ".create-card-button", function() {
    let column = $(this).parent().attr('data-column');
    let cardName = $(`.create-card[data-column="${column}"] textarea`).val();
    $(`.create-card[data-column="${column}"] textarea`).val('');
    if (cardName === "") {
      return;
    } else {
      $(`.add-card[data-column="${column}"]`).slideDown('normal');
      $(`.create-card[data-column="${column}"]`).slideUp('normal');
      $(`.cards[data-column="${column}"]`)
        .append(`<div class="card">${cardName}</div>`);
      
      setTimeout(function() {
        $(`.cards[data-column="${column}"]`).children().last().css('animation-play-state', 'paused');
      }, 1000);
      
      $(`.cards[data-column="${column}"]`).children().last()
        .draggable({
          helper: function() {
            let width = $(this).outerWidth();
            return $(this).clone().appendTo("body").width(width);
          },
          start: function(e, ui) {
            $(this).hide();
          },
          stop: function(e, ui) {
            $(this).show();
          }
        })
        .droppable({
          accept: function(el) {
              return el.hasClass("card")
          },
          drop: function(e, ui) {
            $(e.target).after(ui.draggable[0]);
            $(ui.draggable[0]).css('animation-play-state', 'running');
            
            setTimeout(function() {
              $(ui.draggable[0]).css('animation-play-state', 'paused');
            }, 1000);
            
            $(this).removeClass("over").css('margin-bottom', '8px');
          },
          over: function(e, ui) {
            $(this).addClass("over").css('margin-bottom', '53px');
          },
          out: function(e, ui) {
            $(this).removeClass("over").css('margin-bottom', '8px');
          },

        });
    }
  });
  
});