package net.modwizard.extras.glowingplayer.mixin;

import net.modwizard.extras.glowingplayer.GlowingPlayer;
import net.minecraft.client.MinecraftClient;
import net.minecraft.entity.Entity;
import net.minecraft.entity.player.PlayerEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(MinecraftClient.class)
public abstract class GlowingPlayerMixin {
    @Inject(method = "hasOutline", at = @At("HEAD"), cancellable = true)
    private void miniplayer_forcePlayerGlow(Entity entity, CallbackInfoReturnable<Boolean> cir) {
        if (entity instanceof PlayerEntity player) {
            if (GlowingPlayer.shouldPlayerGlow()) {
                cir.setReturnValue(true);
                cir.cancel();
            }
        }
    }
}