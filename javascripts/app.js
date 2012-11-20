var score_card = {};

(function($){
  score_card.Round = Backbone.Model.extend({
    defaults: {
      round_number: 0,
      p1_score:     0,
      p2_score:     0,
      active:       false
    }
  });

  score_card.Rounds = Backbone.Collection.extend({
    model: score_card.Round
  });

  score_card.init = function(){
    var rounds = new score_card.Rounds();

    _.each([1,2,3,4,5,6],function(num){
      console.log(rounds);
      rounds.add({round_number: num});
    });
    rounds.at(0).set('active',true);
  };

  // now add button bindings
  $("#refresh").live('click',function(){
    window.location = window.location;
  });

  $('#score_card').live('pageinit', function(event){
    score_card.init();
  });
})(jQuery);