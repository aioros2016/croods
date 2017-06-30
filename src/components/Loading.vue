<template>
	<div>
		<div class="loading" id="loading">
			<div class="line-box">
				<img src="../assets/images/1.png" />
				<div class="line" id="line"><img src="../assets/images/2.png" /></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted(){
			this.loading();
		},
		methods:{
			loading(){
				var oHtml = document.getElementsByTagName('html')[0];
				var oBody = document.getElementsByTagName('body')[0];
				var loading = document.querySelector('#loading');
				var animateArea = document.querySelector('#animate-area');
				var oLine = document.querySelector('#line');
				var total = 6;
				var count = 1;
				
				for (var i = 1; i < total; i++) {
					var oImg = new Image();
					oImg.src = "/mobile/dist/assets/images/" + i + ".png";
					oImg.onload = function() {
						count++;
						console.log(count);
						var scale =  count / total;
						oLine.style.width = (scale*100).toFixed(2) + "%";
						if(count == total){
							setTimeout(function(){
								loading.style.display = "none";
								if(window.orientation === 90 || window.orientation === -90) return;
								animateArea.className = "animate-area active";
								oHtml.style.className = oBody.style.className = '';
							}, 300);
						};
					};
				}
			}
		}
	}
</script>