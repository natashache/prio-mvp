import HTML5Backend from 'react-dnd-html5-backend';

var React = require('react'),
    Card = require("./Card"),
    ReactDnD = require('react-dnd');

var style = {
    width: 400
};

var Container = React.createClass({
    getInitialState: function(){
        return {
            cards: this.props.list
            // [
            // {order:1,id:1,text:'learn react'}
            // ]
        };
    },

    compareCards: function(card1, card2){
        return card1.order - card2.order;
    },

    swapCards: function(id1, id2) {
        var cards = this.props.list;

        var card1 = cards.filter(function(c){return c.id === id1})[0];
        var card2 = cards.filter(function(c){return c.id === id2})[0];
        var card1Order = card1.order;
        card1.order = card2.order;
        card2.order = card1Order;

        cards.sort(this.compareCards);

        this.setState({
            cards: cards
        });
    },

    render: function() {
        // console.log('this.state.cards:',this.props.list);

        if(this.props.list.length===0) {
            return (
                <div>Enter some priorities...</div>
            )
        } else {
            return (
                <div style={style}>
                    {this.props.list.map(function(card,i) {
                        return (
                            <Card key={card.id}
                                        id={card.id}
                                        order={card.order}
                                        text={card.text}
                                        swapCards={this.swapCards} />
                        );
                    }, this)}
                </div>
            )
        };
    }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(Container);

