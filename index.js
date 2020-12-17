import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

/** ここで Square を関数コンポーネントに書き換えましょう。
 * React における関数コンポーネントとは、render メソッドだけを有して自分の state を持たないコンポーネントを、よりシンプルに書くための方法です。
 * 。React.Component を継承するクラスを定義する代わりに、props を入力として受け取り表示すべき内容を返す関数を定義します。
 */
function Square(props){
  return (
    <button className="square" onClick={props.onTest} >
      {props.value}
    </button>
  );
}
// ★クラス Square
// class Square extends React.Component {
//   /* Square コンポーネントに自分がクリックされたことを「覚えさせ」て、“X” マークでマスを埋めるようにさせます。コンポーネントが何かを「覚える」ためには、state というものを使います。 
//   */
//  /*
//  react チュートリアル：Boardコンポーネントでゲーム状態を管理～
//  Square はもはやゲームの状態を管理しなくなったので、Square の constructor を削除する
//  */
// //  constructor(props) {
// //    super(props);//JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべきです。
// //    this.state = {
// //      value : null,
// //    };
// //  }
//   render() {
//     return (
//       <button 
//         className="square" 
//         // onClick={() => this.setState({value : 'X'})
//         onClick={() => this.props.onTest()} 
//         /* Board は Square に onClick={() => this.handleClick(i)} を渡していたので、Square はクリックされたときに this.handleClick(i) を呼び出します。*/
//       >
//       {/* Square コンポーネントがクリックされた場合に “X” と表示 */}
//       {/* bordコンポ―ネントのrenderSquare()から渡されたvalueを表示 */}
//        {/* {this.props.value} */}
//        {/*{this.state.value} */}
//        {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  // 複数の子コンポーネント(Square)で管理されているstateを親コンポーネント(Board)で扱うことで、子コンポーネントで複数扱えるようにする。（親コンポーネントへのリフトアップ）
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  // クリックされたsquareに印付けを行う。
  handleClick(i) {
    const squares = this.state.squares.slice(); // イミュータビリティの実現
    //squares[i] = 'X';
    if(calculateWinner(squares) || squares[i]){
      return;//ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return するようにします。
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext // プレイヤーの手番管理
    }); //★ここで、個々のstateをBoardで管理できるようにしている
  }

  renderSquare(i) {
    {/* データを Props 経由で渡す
         Board コンポーネントから Square コンポーネントにデータを渡してみましょう。*/}
    {/* ①props として value という名前の値を Square に渡す
    return <Square value={i}/>;
     */}
    return (<Square 
              value={this.state.squares[i]}
              onTest={() => this.handleClick(i)}
            />
          );
          {/*マス目がクリックされた時に Square にその関数を呼んでもらうようにした */}
          {/*読みやすさのために return される要素を複数行に分割しています。また JavaScript が return の後にセミコロンを挿入するのを防ぐため、カッコを付け加えています。 */}
          {/** 慣習
           React では、イベントを表す props には on[Event] という名前、イベントを処理するメソッドには handle[Event] という名前を付けるのが慣習となっています。  */}
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner:' + winner;
    }else {
      status = 'Next player: ' +(this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// 勝者判定
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}