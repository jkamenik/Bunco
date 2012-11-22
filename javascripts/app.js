var score_card = {};

(function($){
  score_card.Round = Backbone.Model.extend({
    defaults: {
      round_number: 0,
      p1_score:     0,
      p2_score:     0,

      // items set by validations
      active:       false,
      complete:     false,
      player:       1
    },

    addScore: function(score){
      if(score == 0){
        this.togglePlayer();
      } else {
        var p       = this.get('player');
        var p_score = "p"+p+"_score";

        this.set(p_score,(this.get(p_score) + score));
      }
    },

    validate: function(attributes){
      if(attributes['p1_score'] >= 21 || attributes['p2_score'] >= 21){
        this.set('complete',true);
        this.set('active',false);
      }
    },

    togglePlayer: function(){
      this.set('player', this.get('player') == 1 ? 2 : 1);
    }
  });

  score_card.Rounds = Backbone.Collection.extend({
    model: score_card.Round,

    activeRound: function(){
      return this.where({active: true})[0];
    },
    addScore: function(score){
      this.activeRound().addScore(score);
    },
    setPlayer: function(player){
      this.activeRound().set('player',player);
    }
  });

  score_card.RoundListView = Backbone.View.extend({
    initialize: function(){
      this.template = _.template($("#round").html());
    },

    render: function(){
      var dom      = this.$el;
      var template = this.template;
      dom.empty();

      this.collection.each(function(round){
        dom.append(template(round.toJSON()));
      });

      // needed for jquery to rerender dom
      dom.trigger('create');

      return this;
    }
  });

  score_card.init = function(){
    var rounds = new score_card.Rounds();

    _.each([1,2,3,4,5,6],function(num){
      rounds.add({round_number: num});
    });
    rounds.at(0).set('active',true);

    var view = new score_card.RoundListView({
      el:         ":jqmData(role='content') :jqmData(role='collapsible-set')",
      collection: rounds
    });
    view.render();

    rounds.on('change:complete',function(model){
      if(model.active){return;}

      var index = this.indexOf(model);
      var next = this.at(index+1);

      if(next){
        next.set('active',true);
      }
    });
    rounds.on('change',function(model){view.render()});

    score_card.rounds = rounds;
  };
})(jQuery);