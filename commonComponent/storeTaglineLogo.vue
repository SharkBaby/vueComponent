<template>
	<div class="smb-proLogo">
	  <img :src="i18n.smbProTagLineLogo" alt="LenovoPro" />
	</div>
</template>
<script>
export default {
  data () {
	var i18n=this.$parent.i18n||(window.vuePageDataInfo&&window.vuePageDataInfo.i18n||{});
    return {
	i18n: i18n
	};
  }
}
</script>

<style scoped>
	.smb-proLogo {
		height: 65px;
		width: 200px;
		margin: 0 auto;
		margin-top: 20px;
	}
	.smb-proLogo img {
	  width: 200px; 
	}
	
	@media (max-width: 281px) {
		.smb-proLogo {
			width: 90%
		}
		
		.smb-proLogo img {
			width: 100%
		}
	}
</style>