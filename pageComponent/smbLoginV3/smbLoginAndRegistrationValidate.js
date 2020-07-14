import {axiosRequest} from '../../commonComponent/common';

export function checkSmbEmail($this, successCallback){
    // statusInfo.isRunning
    $this.statusInfo.isRunning = true;
    $this.step1PopoverShow = false;
    $this.statusInfo.step1HasError = false;
    const getObj = {
      getUrl: $this.webRootLocation + '/smbRegistrationV3/beforeLoginCheckV3',
      params: {
        username : $this.userInfo.username
      }
    }
    axiosRequest.axiosGet(getObj)
      .then(function(response){
        var result = response.data;
        /*** mock json
         * var result = {
          "success": true,
          "userType": "lenovoId,Tele,SMB",
          "redirectPage": "NewPRO_NewLID"
        };
        ***/
        // statusInfo.isRunning
        $this.statusInfo.isRunning = false;
        // success -> true
        /**
         * register.email.smb.invalid.pattern - popup window
          register.email.reject.illegal.nemoRegisterForm.email - inline text under Logo
          registration.error.email.domian.failed - inline text under Logo
          lenovoid.getUser.account.smbnotmatch.error - inline text under Logo
         */
        if (result.success) {
            $this.statusInfo.step1HasError=false;
            $this.continueBtnShow = false;
            setTimeout(() => {
              $this.continueBtnShow = true;
            }, 580);
            successCallback();
            
            // check NewPRO_NewLID,NewPRO_ExistingLID,ReturningPRO
            // 'NewPRO_NewLID', 'NewPRO_ExistingLID', 'ReturningPRO'
            switch(result.redirectPage){
            case "NewPRO_NewLID":
                $this.statusInfo.currentStep = 'NewPRO_NewLID'; //step 1a
                $this.statusInfo.tipMessage = $this.i18n.NewPRO_NewLIDMsgV3 + " " + $this.userInfo.username;
                break;
              case "NewPRO_ExistingLID":
                $this.statusInfo.currentStep = 'NewPRO_ExistingLID'; //step 1b
                $this.statusInfo.tipMessage = $this.i18n.NewPRO_ExistingLIDMsg;
                break;
              case "ReturningPRO":
                $this.statusInfo.currentStep = 'ReturningPRO'; //step 1c
                $this.statusInfo.tipMessage = $this.i18n.ReturningPROMsg;
                break;
            }
                               
        } else if(result.messageKey == 'register.email.smb.invalid.pattern'){ // popup window
          $this.statusInfo.step1ErrorMessage = result.errorMessage;
          $this.statusInfo.step1HasError = true;
          $this.step1PopoverShow = true;
          //add trank for adboe error format email
          //AC1
          var errorType ="Smb_Pro : User email format error";
          var errorDetail = "login email format is error.";
        } else { //inline text under Logo
          $this.statusInfo.tipMessage = result.errorMessage;
          $this.statusInfo.hasError = true;
          $this.step1PopoverShow = false;
          if(result.messageKey =="lenovoid.getUser.account.smbnotmatch.error"){
              //AC2
              var errorType ="Smb_Pro : Account Not valid";
              var errorDetail = "Account already created in another country";
          }
        }
      }).catch(function(err) {
        // statusInfo.isRunning
        $this.statusInfo.isRunning = false;
        // error
        $this.statusInfo.step1ErrorMessage = $this.i18n.callErrorMsg;
        $this.statusInfo.step1HasError = true;
        $this.step1PopoverShow = true;
    })
}