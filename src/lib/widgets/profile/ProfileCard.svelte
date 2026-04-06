<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    interface Props {
        title: string;
        dotColor?: string;
        titleColor?: string;
        delay?: number;
        children?: import('svelte').Snippet; 
    }

    let { 
        title, 
        dotColor = 'bg-[#4F46E5]', 
        titleColor = 'text-gray-900', 
        delay = 0,
        children
    }: Props = $props();
</script>

<div class="mb-6 rounded-[20px] bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)]" 
     in:fly={{ y: -20, duration: 400, delay, easing: cubicOut }}>
    
    <div class="mb-5 flex items-center gap-2.5">
        <div class="h-2 w-2 rounded-full {dotColor} translate-y-px"></div>
        <h2 class="text-base leading-none font-bold {titleColor}">{title}</h2>
    </div>

    {@render children?.()}
</div>