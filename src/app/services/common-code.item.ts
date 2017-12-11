export class CommonCodeItem{
    private gradeCodeList: any = null;     //학년 코드 10001
    private subjectCodeList: any = null;   //과목코드 10002
    private termCodeList: any = null;       //단계코드 10003
    private companyCodeList: any = null;    //제공업체 10004
    private levelCodeList: any = null;      //비교과 유형 10005
    private componentCodeList: any = null;  //컴포넌트 10007
    private serviceCodeList: any = null;    //제공서비스 10008
    private eduDataCodeList: any = null;    //교육자료배포 10012
    private existExpectCodeList: any = null;    //기출예상문제 10013

    public getGradeCodeList(){
        return this.gradeCodeList;
    }

    public setGradeCodeList(param:any){
        this.gradeCodeList = param;
    }

    public getSubjectCodeList(){
        return this.subjectCodeList;
    }

    public setSubjectCodeList(param:any){
        this.subjectCodeList = param;
    }

    public getTermCodeList(){
        return this.termCodeList;
    }

    public setTermCodeList(param:any){
        this.termCodeList = param;
    }

    public getCompanyCodeList(){
        return this.companyCodeList;
    }

    public setCompanyCodeList(param:any){
        this.companyCodeList = param;
    }

    public getLevelCodeList(){
        return this.levelCodeList;
    }

    public setLevelCodeList(param:any){
        this.levelCodeList = param;
    }

    public getComponentCodeList(){
        return this.componentCodeList;
    }

    public setComponentCodeList(param:any){
        this.componentCodeList = param;
    }

    public getServiceCodeList(){
        return this.serviceCodeList;
    }

    public setServiceCodeList(param:any){
        this.serviceCodeList = param;
    }

    public getEduDataCodeList(){
        return this.eduDataCodeList;
    }

    public setEduDataCodeList(param:any){
        this.eduDataCodeList = param;
    }

    public getExistExpectCodeList(){
        return this.existExpectCodeList;
    }

    public setExistExpectCodeList(param:any){
        this.existExpectCodeList = param;
    }

    public setCodeDataFromJson(jsonData : any){
        this.gradeCodeList = jsonData.gradeCodeList;
        this.subjectCodeList = jsonData.subjectCodeList;
        this.termCodeList = jsonData.termCodeList;
        this.companyCodeList = jsonData.companyCodeList;
        this.levelCodeList = jsonData.levelCodeList;
        this.componentCodeList = jsonData.componentCodeList;
        this.serviceCodeList = jsonData.serviceCodeList;
        this.eduDataCodeList = jsonData.eduDataCodeList;
        this.existExpectCodeList = jsonData.existExpectCodeList;
    }

}