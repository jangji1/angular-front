/*******************************************************************
 * 유도학습 데이터 모델
 ******************************************************************/
export class TalkNode{
    public induceStudyTalkId: number;
    public induceStudyId: number;
    public induceStudyTalkIdup: number;
    public idx: number;
    public type: string;
    public text: string;
    public answer: string;
    public examples: string[] = [];
    public childList: TalkNode[] = [];
    public parentNode: TalkNode;
    public owner: number;

    constructor(){
        
    }
}


/**
 * 유도학습 매니저
 */
export class TalkManager{
    private currentList: TalkNode;

    constructor(
        private talkList: TalkNode,
    ){
        this.currentList = talkList;    
    }

    public getCurrentTalk(): TalkNode{
        return this.currentList;
    }

    public findNext(): TalkNode{
        //Find Child
        if (this.currentList.childList != null && this.currentList.childList.length > 0){
            this.currentList = this.currentList.childList[0];
            return this.currentList;
        }
        else{
            if (this.currentList.parentNode != null && (this.currentList.parentNode.type == 'T' || this.currentList.parentNode.type == 'R')){
                let bros = this.findBros();
                if (bros != null){
                    this.currentList = bros;
                    return this.currentList;
                }
                else{
                    if (this.currentList.parentNode.type == 'R'){
                        return null;
                    }
                }
            }
            let next = this.findAncestor();
            this.currentList = next;
            return this.currentList;
        }
    }

    public findBros(): TalkNode{
       let parent = this.currentList.parentNode;
       if (this.currentList.idx < parent.childList.length-1){
           return parent.childList[this.currentList.idx+1];           
       }       
       return null;
    }

    public findAncestor(): TalkNode{
        let parent = this.currentList.parentNode;
        let grandParent = parent.parentNode;

        //조부모가 질문일 경우 부모는 답변중 하나이므로 부모의 형제를 찾으면 안된다. 조부모의 형제를 찾는다.
        if (grandParent.type == 'Q' || grandParent.type == 'S'){
            this.currentList = grandParent;
            return this.findBros();
        }
        else{
            this.currentList = parent;
            return this.findBros();
        }
    }

    //대답에 따른 처리
    public answerProcess(answer: string): TalkNode{
        let idx = 1;
        if (this.currentList.type == 'Q'){
            let ansArray = this.currentList.answer.split(';');
            for (let ansStr of ansArray){
                if (ansStr == answer){
                    idx = 0;
                    break;
                }
            }
        }
        else if (this.currentList.type == 'S'){
            if (answer == this.currentList.answer){
                idx = 0;
            }     
        }
        else if (this.currentList.type == 'E' || this.currentList.type == 'W'){
            idx = 0;
        }
        
        this.currentList = this.currentList.childList[idx];
        return this.currentList;        
    }
}
