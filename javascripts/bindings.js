(function($){
  $('#score_card').live('pageinit', function(event){
    score_card.init();
  });

  // now add button bindings
  $("#refresh").live('click',function(){
    window.location = window.location;
  });

  $(":submit").live('click',function(){
    var score  = parseInt($(this).data('score'));
    var player = parseInt($(this).data('player'));

    score_card.rounds.setPlayer(player);
    score_card.rounds.addScore(score);
  });
})(jQuery);