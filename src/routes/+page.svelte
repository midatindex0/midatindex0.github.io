<script lang="ts">
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";

    let texts = [
        "In the whispers of twilight, dreams find their canvas. ".split(""),
        "Eternal echoes dance within the corridors of possibility. ".split(""),
        // ,
        "Serenity weaves a tapestry of thoughts across the expanse of the mind. ".split(
            ""
        ),
        "Between the stars, secrets linger, waiting for curious hearts. ".split(
            ""
        ),
        "Moments, like dewdrops, adorn the fragile web of existence. ".split(
            ""
        ),
        "Lost in the symphony of existence, we discover the rhythm of our souls. ".split(
            ""
        ),
        "Wandering is not always about being lost; sometimes, it's how we find ourselves. ".split(
            ""
        ),
        "The kaleidoscope of emotions paints the world with hues unseen. ".split(
            ""
        ),
        "In the embrace of solitude, the universe whispers its grandest stories. ".split(
            ""
        ),
        "Time is an artist, painting stories upon the canvas of reality. ".split(
            ""
        ),
        "A question hangs in the air, waiting for the right heart to catch it. ".split(
            ""
        ),
        "Through the labyrinth of uncertainty, courage becomes our guiding star. ".split(
            ""
        ),
        "In the garden of thoughts, the flowers of imagination bloom endlessly. ".split(
            ""
        ),
        "Stars are the punctuation marks in the novel of the night sky. ".split(
            ""
        ),
        "Waves of possibility caress the shores of what could be. ".split(""),
        "The mosaic of life is made from fragments of moments, both big and small. ".split(
            ""
        ),
        "The language of the universe is written in the constellations of our dreams. ".split(
            ""
        ),
        "Silence speaks loudest in the presence of understanding hearts. ".split(
            ""
        ),
        "A library of untold stories resides within the chambers of each heart. ".split(
            ""
        ),
        "In the dance between chaos and order, creativity finds its rhythm. ".split(
            ""
        ),
    ];
    let seconds: HTMLElement;
    let minutes: HTMLElement;
    let stopped: boolean;
    let enlapsed: number = 0;
    onMount(async () => {
        stopped = localStorage.getItem("stopped") === "true";

        let textCycle: number | undefined;
        let clock: number | undefined;
        if (!stopped) {
            textCycle = setInterval(() => {
                texts.forEach((text) => {
                    if (Math.random() > 0.5) {
                        let l = text.shift();
                        if (l) {
                            text.push(l);
                        }
                        texts = texts;
                    }
                });
            }, 100);
            clock = setInterval(() => {
                const now = new Date();
                const s = now.getSeconds();
                const ms = now.getMilliseconds();
                const secondsDegrees = ((s + ms / 1000) / 60) * 360 + 90;
                seconds.style.transform = `rotate(${360 - secondsDegrees}deg)`;
                const m = now.getMinutes();
                const minsDegrees = (m / 60) * 360 + (s / 60) * 6 + 90;
                minutes.style.transform = `rotate(${360 - minsDegrees}deg)`;
                enlapsed += 0.2;
            }, 200);
        }

        window.addEventListener("keypress", (event) => {
            if (event.key == "s") {
                clearInterval(textCycle);
                clearInterval(clock);
                stopped = true;
                localStorage.setItem("stopped", "true");
            }
        });
    });
</script>

<div class="font-inter">
    <div
        class="fixed z-0 w-screen flex text-xs gap-2 bg-[url(bg.jpg)] bg-cover bg-no-repeat bg-center overflow-hidden opacity-60"
    >
        {#each Array(40) as _, i}
            <div class="flex-grow bg-base-100 px-1">
                {#each texts[i % texts.length] as char}
                    <div
                        class="text-center"
                        class:text-primary={Math.random() < 0.1}
                        class:font-bold={Math.random() < 0.1}
                    >
                        {#if char === " "}
                            &nbsp;
                        {:else}
                            {char}
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    <div class="h-10" />
    <div
        class="relative font-mono mx-auto w-[320px] md:w-[500px] h-[320px] md:h-[500px] p-2 border-8 border-base-200 rounded-full shadow-xl"
    >
        <div class="enlapsed font-inter font-bold">{Math.floor(enlapsed)}s</div>
        <div bind:this={minutes} class="hand w-[45%] text-xs uppercase">
            R l n l s &nbsp;s c n s
        </div>
        <div bind:this={seconds} class="hand w-[45%] text-xs uppercase">
            &nbsp;e e t e s &nbsp;e o d&nbsp; <span
                class="hidden md:inline-block">write time</span
            >
        </div>
    </div>
    <div class="my-10 p-5 relative">
        <div class="uppercase text-3xl font-bold text-center">My Projects</div>
        <div class="text-center">
            Haven't made anything useful yet.
            <br />Heres a poem generated by chat gpt.
        </div>
        <div class="text-center py-5">
            Whispering shadows dance on glass,<br />
            Pickle-flavored dreams in an hourglass.<br />
            Purple raindrops sing in the breeze,<br />
            Jellyfish waltz through cosmic seas.<br />

            Twirling whispers of cotton candy trees,<br />
            Invisible symphonies carried by bees.<br />
            Velvet stars hum a polka dot song,<br />
            Marshmallow rivers meander along.<br />

            In this whimsical world, reflections reside,<br />
            Meaning's found in the surreal, deep inside.<br />
        </div>
    </div>
    <div class="h-10" />
    <div class="relative text-center font-bold">
        {#if !stopped}
            Press S to stop everything.
        {:else}
            Once it's stopped, it can't be started again.
        {/if}
    </div>
    <div class="relative flex justify-center gap-5">
        <a href="https://github.com/midatindex0">
            <Icon class="text-4xl" icon="mdi:github" />
        </a>
    </div>
    <div class="relative text-center text-xs">
        Photo by <a
            class="link"
            href="https://unsplash.com/@8moments?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            >Simon Berger</a
        >
        on
        <a
            class="link"
            href="https://unsplash.com/photos/rydQVdwcgUQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            >Unsplash</a
        >
    </div>
    <div class="h-10" />
</div>

<style>
    .hand {
        right: 50%;
        position: absolute;
        top: 50%;
        transform-origin: 100%;
        transform: rotate(90deg);
        transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }

    .enlapsed {
        right: 50%;
        position: absolute;
        top: 10%;
        transform: translate(50%, 50%);
    }
</style>
