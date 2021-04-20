export function MoveEvaluation(props){
    let perfectSpan = "";
    let partialSpan = "";
    let noMatchSpan = "";
    if (props.partial > 0){
        partialSpan = <span className="badge badge-danger">{props.partial}</span>
    }
    if (props.perfect > 0){
        perfectSpan = <span className="badge badge-success">{props.perfect}</span>
    }
    if (props.perfect === 0 && props.partial === 0){
        noMatchSpan = <span className="badge badge-info">NO Match!</span>
    }
    return (
      <div>
          {partialSpan} {perfectSpan} {noMatchSpan}
      </div>
    );
}