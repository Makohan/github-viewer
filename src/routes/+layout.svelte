<script>
	import '../app.css';
</script>

<div class="container mx-auto px-2">
	<header class="flex justify-between items-center py-2 border-b">
		<a href="/" class="font-bold text-gray-800">GitHub Viewer</a>

		<nav>
			<a href="/issues" class="text-gray-500 hover:text-gray-600 px-2">Issues</a>
			<a href="/projects" class="text-gray-500 hover:text-gray-600 px-2">Projects</a>
		</nav>
	</header>

	<main class="pt-2">
		<slot />
	</main>
</div>
